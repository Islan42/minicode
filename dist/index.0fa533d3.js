// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"1Usk0":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "ab5ac7450fa533d3";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"adcRX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _minicodeJs = require("./modules/minicode.js");
var _minicodeJsDefault = parcelHelpers.interopDefault(_minicodeJs);
const panel = document.getElementById("game-panel");
const minigame = new (0, _minicodeJsDefault.default)(panel);

},{"./modules/minicode.js":"2eVit","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2eVit":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class MiniCode {
    #root;
    #intBar;
    #lvlBar;
    #pointsBar;
    #penaltiesBar;
    #boostBar;
    #prevNextBar;
    #coding;
    #lvl;
    #score;
    #penalties;
    #boost;
    #bugsLvl;
    #clicks;
    #pointsMulti;
    #boostMulti;
    #preventPenalties;
    #decreaseInterval;
    #keyHandlerBind;
    #callGameStartBind;
    #keytopress;
    #fatiguepower;
    #codepower;
    #bugsInterval;
    #bugsON;
    #bugsSaveNormal;
    #bugsCount;
    #canvas;
    #ctx;
    #gameOn;
    #controlFR;
    #spriteKey;
    #spriteLorem;
    #spritePen;
    #spriteRestart;
    #assets;
    #negativeAnim;
    constructor(root){
        this.#root = root;
        //addButton
        const para = document.createElement("p");
        para.textContent = "Atualmente n\xe3o tenho nenhum projeto para apresentar mas estou trabalhando nisso. Espere a\xed... talvez voc\xea possa me ajudar. Que tal p\xf4r a m\xe3o no meu c\xf3digo??";
        const startBtn = document.createElement("button");
        startBtn.textContent = "LA ELE";
        startBtn.addEventListener("click", this.gameStart.bind(this), {
            once: true
        });
        this.#root.appendChild(para);
        this.#root.appendChild(startBtn);
        const lorem = new Image();
        lorem.src = "../assets/lorem.png";
        //lorem.src = require("../assets/lorem.png"); //mudar para import() [?]
        const desk = new Image();
        desk.src = "../assets/desk.png";
        //desk.src = require("../assets/desk.png");
        const key = new Image();
        key.src = "../assets/key.png";
        //key.src = require("../assets/key.png");
        const spacebar = new Image();
        spacebar.src = "../assets/spacebar.png";
        //spacebar.src = require("../assets/spacebar.png")
        const penalties = new Image();
        penalties.src = "../assets/penalties.png";
        //penalties.src = require("../assets/penalties.png")
        const bugs = new Image();
        bugs.src = "../assets/bugs.png";
        //bugs.src = require("../assets/bugs.png")
        this.#assets = {
            lorem,
            desk,
            key,
            spacebar,
            penalties,
            bugs
        };
    }
    gameStart() {
        //this.#canvas.removeEventListener("click", this.#callGameStartBind)
        //document.removeEventListener("keydown", this.#callGameStartBind)
        this.#gameOn = true;
        this.#coding = 50;
        this.#lvl = {
            lvl: 0,
            prevLvl: 0,
            nextLvl: 100,
            maxLvl: 0
        };
        this.#codepower = 25;
        this.#fatiguepower = 5;
        this.#clicks = 0;
        this.#score = 0;
        this.#boost = 0;
        this.#penalties = 0;
        this.#pointsMulti = 1;
        this.#boostMulti = 1;
        this.#bugsLvl = {
            lvl: 0,
            prevLvl: 0,
            nextLvl: 1000
        };
        this.#bugsON = {
            start: false,
            end: false
        };
        this.#bugsSaveNormal = {
            coding: 0,
            prevLvl: 0,
            nextLvl: 100
        };
        this.#bugsCount = [];
        this.#preventPenalties = false;
        this.#keyHandlerBind = this.keyHandler.bind(this);
        this.#callGameStartBind = this.callGameStart.bind(this);
        this.#controlFR = 0;
        this.#spriteKey = 0;
        this.#spriteLorem = 0;
        this.#spritePen = 0;
        this.#spriteRestart = 0;
        this.#negativeAnim = false;
        //this.updateBars();
        this.setKey(" ");
        this.setDecreaseInter(500);
        this.setBugsInter(10, 18);
        if (!this.#canvas) {
            this.#intBar = document.createElement("p");
            this.#lvlBar = document.createElement("p");
            this.#pointsBar = document.createElement("p");
            this.#penaltiesBar = document.createElement("p");
            this.#boostBar = document.createElement("p");
            this.#prevNextBar = document.createElement("p");
            this.#canvas = document.createElement("canvas");
            while(this.#root.firstChild)this.#root.removeChild(this.#root.firstChild);
            this.#root.appendChild(this.#intBar);
            this.#root.appendChild(this.#lvlBar);
            this.#root.appendChild(this.#pointsBar);
            this.#root.appendChild(this.#penaltiesBar);
            this.#root.appendChild(this.#boostBar);
            this.#root.appendChild(this.#prevNextBar);
            this.#root.appendChild(this.#canvas);
            this.#ctx = this.#canvas.getContext("2d");
            this.#canvas.width = 500;
            this.#canvas.height = 200;
            this.animation();
        }
    }
    gameOver() {
        clearInterval(this.#decreaseInterval);
        document.removeEventListener("keydown", this.#keyHandlerBind);
        clearTimeout(this.#bugsInterval);
        this.#gameOn = false;
        this.#canvas.addEventListener("click", this.#callGameStartBind);
        document.addEventListener("keydown", this.#callGameStartBind);
    }
    callGameStart(event) {
        event.stopPropagation();
        if (event.type === "click") {
            this.#canvas.removeEventListener("click", this.#callGameStartBind);
            document.removeEventListener("keydown", this.#callGameStartBind);
            this.gameStart();
        } else if (event.type === "keydown") {
            if (event.key === " ") {
                this.#canvas.removeEventListener("click", this.#callGameStartBind);
                document.removeEventListener("keydown", this.#callGameStartBind);
                event.preventDefault();
                this.gameStart();
            }
        }
    }
    updateBars() {
        if (this.#intBar && this.#lvlBar && this.#pointsBar && this.#penaltiesBar && this.#boostBar && this.#prevNextBar) {
            this.#intBar.textContent = `NIVEL DE INTENSIDADE: ${this.#coding}`;
            this.#lvlBar.textContent = this.#bugsON.end ? `BUGS LVL: ${this.#bugsLvl.lvl - 1}` : `LVL: ${this.#lvl.lvl}`;
            this.#pointsBar.textContent = `PTS: ${this.#score}`;
            this.#penaltiesBar.textContent = `PENALTIES: ${this.#penalties}`;
            this.#boostBar.textContent = `BOOST: ${this.#pointsMulti} x ${this.#boostMulti.toFixed(1)}: ${this.#boost} `;
            this.#prevNextBar.textContent = `PREV: ${this.#lvl.prevLvl} NEXT: ${this.#lvl.nextLvl}`;
        }
    }
    setKey(key) {
        if (this.#keytopress) document.removeEventListener("keydown", this.#keyHandlerBind);
        this.#keytopress = key;
        document.addEventListener("keydown", this.#keyHandlerBind);
    }
    setDecreaseInter(inter) {
        if (this.#decreaseInterval) clearInterval(this.#decreaseInterval);
        this.#decreaseInterval = setInterval(this.negativeCoding.bind(this), inter);
    }
    setBugsInter(min, max) {
        const time = this.random(min, max);
        if (this.#bugsInterval) clearTimeout(this.#bugsInterval);
        this.#bugsInterval = setTimeout(()=>{
            this.#bugsON.start = true;
            console.log("OK");
        }, time * 1000);
        console.log(time);
    }
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    keyHandler(event) {
        //console.log("hy")
        if (event.key === " ") event.preventDefault();
        if (!event.repeat) {
            this.#clicks++;
            const match = event.key.toLowerCase() === this.#keytopress.toLowerCase();
            if (match) {
                this.positiveCoding(this.#codepower);
                this.updateBoost();
                this.updatePoints();
            } else {
                this.negativeCoding(Math.floor(this.#codepower * 0.9));
                this.#negativeAnim = true;
                setTimeout(()=>this.#negativeAnim = false, 500);
            }
        }
    }
    updateBoost() {
        this.#boost++;
        setTimeout(()=>{
            if (this.#boost > 0) this.#boost--;
        }, 6500); //BUG #02
        switch(true){
            case this.#boost < 5:
                this.#boostMulti = 1;
                break;
            case this.#boost < 10:
                this.#boostMulti = 1.5;
                break;
            case this.#boost < 15:
                this.#boostMulti = 2;
                break;
            case this.#boost < 20:
                this.#boostMulti = 2.5;
                break;
            case this.#boost < 25:
                this.#boostMulti = 3.0;
                break;
            case this.#boost < 30:
                this.#boostMulti = 3.5;
                break;
            case this.#boost < 35:
                this.#boostMulti = 4.0;
                break;
            case this.#boost < 40:
                this.#boostMulti = 4.5;
                break;
            case this.#boost < 45:
                this.#boostMulti = 5.0;
                break;
            case this.#boost < 50:
                this.#boostMulti = 5.5;
                break;
            default:
                this.#boostMulti = 6.0;
                break;
        } //BUG #03
    }
    updatePoints() {
        const aux = this.#clicks % 10;
        if (aux === 0) {
            this.#score += 10 * this.#pointsMulti * this.#boostMulti;
            if (this.#spriteLorem % 3 === 0) setTimeout(()=>this.#spriteLorem++, 300);
        }
    }
    negativeCoding(value = this.#fatiguepower) {
        this.#coding -= value;
        if (this.#coding <= this.#lvl.prevLvl) {
            if (!this.#preventPenalties && this.#penalties === 1) this.gameOver();
            else this.lvlDown();
        }
    }
    positiveCoding(value) {
        this.#coding += value;
        if (this.#coding > this.#lvl.nextLvl) this.lvlUp();
    }
    lvlDown() {
        if (this.#lvl.lvl > 0) {
            this.#lvl.lvl--;
            this.setPrevLvl();
        }
        if (!this.#preventPenalties) {
            this.#penalties++;
            this.#preventPenalties = true;
            setTimeout(()=>this.#preventPenalties = false, 2700);
            this.#spritePen = 0;
        }
    }
    lvlUp() {
        if (!this.#preventPenalties) {
            this.#preventPenalties = true;
            setTimeout(()=>this.#preventPenalties = false, 500);
        }
        if (this.#bugsON.start) this.itsBugsTime();
        else if (this.#bugsON.end) this.itsNotBugsTime();
        this.#lvl.lvl++;
        if (this.#lvl.lvl > this.#lvl.maxLvl) this.#lvl.maxLvl++;
        this.setNextLvl();
        if (this.#bugsON.end) this.itsBugsLvl();
    }
    setNextLvl() {
        this.#lvl.prevLvl = this.#lvl.nextLvl;
        let skip;
        let newFatigue;
        let newDecInter;
        let newCodePower;
        switch(true){
            case this.#lvl.lvl < 5:
                skip = 200;
                newFatigue = 15;
                newDecInter = 300;
                newCodePower = 30;
                break;
            case this.#lvl.lvl < 10:
                skip = 400;
                newFatigue = 18;
                newDecInter = 200;
                newCodePower = 40;
                break;
            case this.#lvl.lvl < 15:
                skip = 600;
                newFatigue = 22;
                newDecInter = 100;
                newCodePower = 45;
                break;
            case this.#lvl.lvl < 20:
                skip = 1000;
                newFatigue = 25;
                newDecInter = 100;
                newCodePower = 50;
                break;
            default:
                skip = 1500;
                newFatigue = 30;
                newDecInter = 100;
                newCodePower = 55;
        }
        this.#lvl.nextLvl += skip;
        this.#fatiguepower = newFatigue;
        this.#codepower = newCodePower;
        this.setDecreaseInter(newDecInter);
    }
    setPrevLvl() {
        this.#lvl.nextLvl = this.#lvl.prevLvl;
        let skip;
        let newFatigue;
        let newDecInter;
        let newCodePower;
        switch(true){
            case this.#lvl.lvl < 5:
                skip = 200;
                newFatigue = 15;
                newDecInter = 500;
                newCodePower = 30;
                break;
            case this.#lvl.lvl < 10:
                skip = 400;
                newFatigue = 18;
                newDecInter = 300;
                newCodePower = 40;
                break;
            case this.#lvl.lvl < 15:
                skip = 600;
                newFatigue = 22;
                newDecInter = 200;
                newCodePower = 45;
                break;
            case this.#lvl.lvl < 20:
                skip = 1000;
                newFatigue = 25;
                newDecInter = 100;
                newCodePower = 50;
                break;
            default:
                skip = 1500;
                newFatigue = 30;
                newDecInter = 100;
                newCodePower = 55;
        }
        this.#lvl.prevLvl -= skip;
        this.#fatiguepower = newFatigue;
        this.#codepower = newCodePower;
        this.setDecreaseInter(newDecInter);
    }
    itsBugsTime() {
        //MUDAR VISUAL
        const keys = [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H",
            "I",
            "J",
            "K",
            "L",
            "M",
            "N",
            "O",
            "P",
            "Q",
            "R",
            "S",
            "T",
            "U",
            "V",
            "W",
            "X",
            "Y",
            "Z"
        ];
        const newKey = keys[this.random(0, 25)];
        this.setKey(newKey);
        this.#pointsMulti = 2;
        this.#penalties = 1;
        this.#preventPenalties = false;
        this.#spritePen = 0;
        this.#bugsON = {
            start: false,
            end: true
        };
        this.#bugsCount = [];
    /*const showBugs = document.createElement("p");
    showBugs.textContent = `BUG TIME: Aperte o botao ${newKey}`;
    this.#root.appendChild(showBugs); */ //BUG #04 [SOLVED]
    }
    itsBugsLvl() {
        this.#bugsSaveNormal = {
            prevLvl: this.#lvl.prevLvl,
            nextLvl: this.#lvl.nextLvl
        }; // coding: this.#coding  BUG #05 [SOLVED]
        this.#lvl.prevLvl = this.#bugsLvl.prevLvl;
        this.#lvl.nextLvl = this.#bugsLvl.nextLvl;
        this.#coding = this.#lvl.nextLvl / 4;
        let lvl = this.#bugsLvl.lvl;
        let newFatigue;
        let newDecInter;
        let nextNextLvl;
        switch(true){
            case lvl === 0:
                newFatigue = 15;
                newDecInter = 200;
                nextNextLvl = 1200;
                break;
            case lvl === 1:
                newFatigue = 15;
                newDecInter = 200;
                nextNextLvl = 1400;
                break;
            case lvl === 2:
                newFatigue = 20;
                newDecInter = 150;
                nextNextLvl = 1600;
                break;
            case lvl === 3:
                newFatigue = 25;
                newDecInter = 100;
                nextNextLvl = 1800;
                break;
            default:
                newFatigue = 45;
                newDecInter = 100;
                nextNextLvl = 2000;
        }
        this.setDecreaseInter(newDecInter);
        this.#fatiguepower = newFatigue;
        this.#bugsLvl = {
            lvl: ++lvl,
            prevLvl: 0,
            nextLvl: nextNextLvl
        };
        console.log(this.#bugsLvl);
    }
    itsNotBugsTime() {
        //MUDAR VISUAL
        this.setKey(" ");
        this.setBugsInter(10, 18);
        this.#pointsMulti = 1;
        this.#penalties = 0;
        this.#bugsON = {
            start: false,
            end: false
        };
        this.#coding = this.#bugsSaveNormal.nextLvl;
        this.#lvl.prevLvl = this.#bugsSaveNormal.prevLvl;
        this.#lvl.nextLvl = this.#bugsSaveNormal.nextLvl;
    // this.#root.removeChild(this.#root.lastChild); //BUG #04 [SOLVED]
    }
    //ANIMATIONS
    animation() {
        /*
    function reset(){}
    this.drawDesk()
    this.drawLorem();
    this.drawEffects()
    this.updateBars(); // this.drawBars
    this.drawToPress(); 
    */ if (this.#controlFR === 60) this.#controlFR = 0;
        else this.#controlFR++;
        if (this.#gameOn) {
            this.updateBars();
            drawDesk.call(this);
            drawLorem.call(this);
            drawBars.call(this);
            drawToPress.call(this);
            drawPenalties.call(this);
            if (this.#bugsON.end) drawBugs.call(this);
        } else drawGameOver.call(this);
        requestAnimationFrame(this.animation.bind(this));
        function drawDesk() {
            this.#ctx.save() // SAVE #01: DESK
            ;
            if (this.#negativeAnim) {
                let randX = this.random(-10, 10);
                let randY = this.random(-10, 10);
                this.#ctx.translate(randX, randY);
            //console.log(randX,randY)
            }
            this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
            this.#ctx.drawImage(this.#assets.desk, 0, 0);
        }
        function drawLorem() {
            const bgColor = this.#lvl.maxLvl < 10 ? "#ededed" : "#272822";
            const fgColor = this.#lvl.maxLvl < 10 ? "#000000" : "#ededed";
            this.#ctx.drawImage(this.#assets.lorem, 0, 21 * this.#spriteLorem, 200, 84, 150, 33, 200, 84);
            this.#ctx.save();
            this.#ctx.globalCompositeOperation = "source-atop";
            this.#ctx.fillStyle = fgColor;
            this.#ctx.fillRect(150, 33, 200, 84);
            this.#ctx.restore();
            if (this.#bugsON.end) {
                this.#ctx.save();
                this.#ctx.globalCompositeOperation = "source-atop";
                this.#ctx.fillStyle = "#f4192c";
                this.#ctx.fillRect(150, 33, 200, 84);
                this.#ctx.restore();
            }
            this.#ctx.save();
            this.#ctx.fillStyle = bgColor;
            this.#ctx.globalCompositeOperation = "destination-atop";
            this.#ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
            this.#ctx.restore();
            this.#ctx.restore() // RESTORE #01: DESK
            ;
            if (this.#controlFR % 13 === 0) {
                if (!(this.#spriteLorem % 3 === 0)) this.#spriteLorem++;
                else if (this.#spriteLorem === 18) this.#spriteLorem = 1;
            }
        }
        function drawBars() {
            this.#ctx.save();
            //CODING
            const diference = this.#lvl.nextLvl - this.#lvl.prevLvl;
            const percentage = (this.#coding - this.#lvl.prevLvl) / diference * 100;
            this.#ctx.fillStyle = "rgb(0,0,0)";
            this.#ctx.fillRect(5, 23, 104, 17);
            if (percentage >= 0) {
                this.#ctx.fillStyle = "rgb(127, 127, 227)";
                this.#ctx.fillRect(7, 25, percentage, 13);
            }
            // LVL
            this.#ctx.font = "18px sans-serif";
            this.#ctx.fillStyle = "rgb(0,0,0)";
            const lvlText = this.#bugsON.end ? `BUGS LVL: ${this.#bugsLvl.lvl - 1}` : `LVL: ${this.#lvl.lvl}`;
            this.#ctx.fillText(lvlText, 5, 60);
            // SCORE
            this.#ctx.fillText(`SCORE: ${this.#score}`, 5, 80);
            //BOOST
            const boostText = this.#pointsMulti === 2 ? `${this.#pointsMulti}x ${this.#boostMulti.toFixed(1)}` : `${this.#boostMulti.toFixed(1)}`;
            this.#ctx.fillText(boostText, 5, 100);
            this.#ctx.restore();
        }
        function drawToPress() {
            if (this.#keytopress === " ") this.#ctx.drawImage(this.#assets.spacebar, 0, 27 * this.#spriteKey, 75, 26, 182, 143, 150, 52);
            else this.#ctx.drawImage(this.#assets.key, 26 * this.#spriteKey, 0, 25, 26, 229, 143, 50, 52);
            this.#ctx.save();
            this.#ctx.fillStyle = "rgb(255,0,0)";
            this.#ctx.font = "bold 18px sans-serif";
            this.#ctx.textAlign = "center";
            const keyText = this.#keytopress === " " ? "SPACEBAR" : `${this.#keytopress}`;
            this.#ctx.fillText(keyText, 250 - 7 * this.#spriteKey, 169 + 6 * this.#spriteKey);
            this.#ctx.restore();
            if (this.#controlFR % 31 === 0) {
                if (this.#spriteKey === 1) this.#spriteKey = 0;
                else this.#spriteKey++;
            }
        }
        function drawPenalties() {
            //this.#ctx.fillRect(470,5,20,20)
            if (this.#penalties === 1) {
                this.#ctx.save();
                this.#ctx.translate(470, 5);
                this.#ctx.rotate(Math.PI / 4);
                this.#ctx.drawImage(this.#assets.penalties, 21 * this.#spritePen, 0, 21, 21, 0, 0, 21, 21);
                this.#ctx.restore();
                if (this.#controlFR % 21 === 0) {
                    if (this.#spritePen !== 6) this.#spritePen++;
                }
            }
        }
        function drawBugs() {
            if (this.#bugsCount.length) {
                for (let bug of this.#bugsCount){
                    this.#ctx.save();
                    this.#ctx.translate(bug.posX, bug.posY);
                    this.#ctx.rotate(bug.rads);
                    this.#ctx.drawImage(this.#assets.bugs, 21 * bug.sprite, 0, 21, 21, 0, 0, bug.size, bug.size);
                    this.#ctx.restore();
                }
                if (this.#controlFR % 61 === 0) for(let i = 0; i < this.#bugsCount.length; i++){
                    const rads = this.random(0, Math.PI * 2);
                    const sprite = this.random(0, 4);
                    const size = this.random(5, 42);
                    const posX = this.random(0, this.#canvas.width - size / 2);
                    const posY = this.random(0, this.#canvas.height - size / 2);
                    this.#bugsCount[i] = {
                        posX,
                        posY,
                        rads,
                        sprite,
                        size
                    };
                }
            }
            if (this.#controlFR % 60 === 0 && this.#bugsCount.length < 30) {
                const posX = this.random(0, this.#canvas.width);
                const posY = this.random(0, this.#canvas.height);
                const rads = this.random(0, Math.PI * 2);
                const sprite = this.random(0, 4);
                const size = this.random(5, 42);
                const newBug = {
                    posX,
                    posY,
                    rads,
                    sprite,
                    size
                };
                this.#bugsCount.push(newBug);
            }
        }
        function drawGameOver() {
            const ctx = this.#ctx;
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
            ctx.save();
            ctx.lineWidth = 5;
            ctx.fillStyle = "rgb(220,220,220)";
            ctx.fillRect(100, 25, 300, 150);
            ctx.strokeRect(100, 25, 300, 150);
            ctx.restore();
            ctx.save();
            ctx.fillStyle = "rgb(220,0,0)";
            ctx.font = "bold 30px sans-serif";
            const measureGOX = ctx.measureText("GAME OVER");
            const posGOX = 100 + (300 - measureGOX.width) / 2;
            ctx.fillText("GAME OVER", posGOX, 80);
            ctx.font = "bold 18px sans-serif";
            const measureLvlX = ctx.measureText(`LVL: ${this.#lvl.maxLvl}`);
            const posLvlX = 100 + (300 - measureLvlX.width) / 2;
            ctx.fillText(`LVL: ${this.#lvl.maxLvl}`, posLvlX, 105);
            const measureScoreX = ctx.measureText(`SCORE: ${this.#score}`);
            const posScoreX = 100 + (300 - measureScoreX.width) / 2;
            ctx.fillText(`SCORE: ${this.#score}`, posScoreX, 130);
            if (this.#controlFR % 31 === 0) {
                if (this.#spriteRestart === 1) this.#spriteRestart = 0;
                else this.#spriteRestart = 1;
            }
            const measureRestartX = ctx.measureText(`RESTART`);
            const posRestartX = 100 + (300 - measureRestartX.width) / 2;
            ctx.fillText(`RESTART`, posRestartX + 3 * this.#spriteRestart, 155 - 3 * this.#spriteRestart);
            ctx.restore();
        }
    }
}
exports.default = MiniCode;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["1Usk0","adcRX"], "adcRX", "parcelRequire94c2")

//# sourceMappingURL=index.0fa533d3.js.map
