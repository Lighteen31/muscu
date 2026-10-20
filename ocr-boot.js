/* Lecteur de texte des photos (Tesseract.js, licence Apache 2.0). Les données de langue sont servies sous le nom fra-traineddata.wasm */
var _fetch = self.fetch.bind(self);
self.fetch = function (u, o) { u = String(u).replace(/([a-z_]+)\.traineddata(\.gz)?$/, '$1-traineddata.wasm'); return _fetch(u, o); };
importScripts('ocr-worker.js');
