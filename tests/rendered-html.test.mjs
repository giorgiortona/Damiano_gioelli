import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Damiano atelier experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Damiano Oro e Gioielli \| Atelier orafo a Galatone<\/title>/i);
  assert.match(html, /Il tempo/);
  assert.match(html, /diventa/);
  assert.match(html, /prezioso/);
  assert.match(html, /Hamilton Jazzmaster Open Heart/i);
  assert.match(html, /hamilton-jazzmaster-open-heart\.webp/);
  assert.match(html, /menu-toggle-seal/);
  assert.match(html, /Oro e argento/);
  assert.match(html, /Lavorazioni orafe/);
  assert.match(html, /Casa e cornici/);
  assert.match(html, /Via Camillo Benso Conte di Cavour, 33/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("removes the disposable starter preview", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /ScrollTrigger/);
  assert.match(page, /atelierTrack\.scrollWidth - atelierGallery\.clientWidth/);
  assert.match(page, /logo_damiano\.jpeg/);
  assert.match(page, /hamilton-jazzmaster-open-heart\.webp/);
  assert.match(layout, /Damiano Oro e Gioielli/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page + layout, /codex-preview|SkeletonPreview|Starter Project/);
  await assert.rejects(access(new URL("../app/_sites-preview/", import.meta.url)));
});
