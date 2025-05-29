"use strict";

// User agent and environment detection for Pooja Kanala's Portfolio
let isIE, isFirefox, isOpera, isWebkit, isChrome, ieRealVersion;
let isOSX, isWindows, isLinux, isAndroid, isWin64, isIphone, isIpad;
let isNativeApp, isMobile, hasFeature, isPopulated = false;

function detectEnvironment() {
	if (isPopulated) return;
	isPopulated = true;

	const ua = navigator.userAgent;

	// Browser detection
	const browserMatch = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(ua);
	// OS detection
	const osMatch = /(Mac OS X)|(Windows)|(Linux)/.exec(ua);

	isIphone = /\b(iPhone|iP[ao]d)/.exec(ua);
	isIpad = /\b(iP[ao]d)/.exec(ua);
	isAndroid = /Android/i.exec(ua);
	isNativeApp = /FBAN\/\w+;/i.exec(ua);
	isMobile = /Mobile/i.exec(ua);
	isWin64 = !!/Win64/.exec(ua);

	if (browserMatch) {
		isIE = browserMatch[1] ? parseFloat(browserMatch[1]) : browserMatch[5] ? parseFloat(browserMatch[5]) : NaN;
		if (isIE && document && document.documentMode) isIE = document.documentMode;
		const tridentMatch = /(?:Trident\/(\d+.\d+))/.exec(ua);
		ieRealVersion = tridentMatch ? parseFloat(tridentMatch[1]) + 4 : isIE;
		isFirefox = browserMatch[2] ? parseFloat(browserMatch[2]) : NaN;
		isOpera = browserMatch[3] ? parseFloat(browserMatch[3]) : NaN;
		isWebkit = browserMatch[4] ? parseFloat(browserMatch[4]) : NaN;
		isChrome = isWebkit && (browserMatch = /(?:Chrome\/(\d+\.\d+))/.exec(ua)) && browserMatch[1] ? parseFloat(browserMatch[1]) : NaN;
	} else {
		isIE = isFirefox = isOpera = isChrome = isWebkit = NaN;
	}

	if (osMatch) {
		if (osMatch[1]) {
			const osxMatch = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(ua);
			isOSX = !osxMatch || parseFloat(osxMatch[1].replace("_", "."));
		} else {
			isOSX = false;
		}
		isWindows = !!osMatch[2];
		isLinux = !!osMatch[3];
	} else {
		isOSX = isWindows = isLinux = false;
	}
}

const PortfolioEnv = {
	isIE: () => { detectEnvironment(); return isIE; },
	isIECompatibilityMode: () => { detectEnvironment(); return ieRealVersion > isIE; },
	isIE64: () => PortfolioEnv.isIE() && isWin64,
	isFirefox: () => { detectEnvironment(); return isFirefox; },
	isOpera: () => { detectEnvironment(); return isOpera; },
	isWebkit: () => { detectEnvironment(); return isWebkit; },
	isSafari: () => PortfolioEnv.isWebkit(),
	isChrome: () => { detectEnvironment(); return isChrome; },
	isWindows: () => { detectEnvironment(); return isWindows; },
	isOSX: () => { detectEnvironment(); return isOSX; },
	isLinux: () => { detectEnvironment(); return isLinux; },
	isIphone: () => { detectEnvironment(); return isIphone; },
	isMobile: () => { detectEnvironment(); return isIphone || isIpad || isAndroid || isMobile; },
	isNativeApp: () => { detectEnvironment(); return isNativeApp; },
	isAndroid: () => { detectEnvironment(); return isAndroid; },
	isIpad: () => { detectEnvironment(); return isIpad; }
};

const canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);

// PortfolioExecution: Environment and Feature Detection for Pooja Kanala's Portfolio
const PortfolioExecution = {
	canUseDOM: typeof window !== "undefined" && !!window.document && !!window.document.createElement,
	canUseWorkers: typeof Worker !== "undefined",
	canUseEventListeners: typeof window !== "undefined" && !!(window.addEventListener || window.attachEvent),
	canUseViewport: typeof window !== "undefined" && !!window.screen,
	isInWorker: typeof window === "undefined"
};

// Utility: Check if a DOM event is supported
function isEventSupported(eventName, capture) {
	if (!PortfolioExecution.canUseDOM || (capture && !("addEventListener" in document))) return false;
	const eventProp = "on" + eventName;
	let isSupported = eventProp in document;
	if (!isSupported) {
		const el = document.createElement("div");
		el.setAttribute(eventProp, "return;");
		isSupported = typeof el[eventProp] === "function";
	}
	return isSupported;
}

// Wheel event normalization for cross-browser support
const PIXEL_STEP = 10, LINE_HEIGHT = 40, PAGE_HEIGHT = 800;
function normalizeWheel(event) {
	let spinX = 0, spinY = 0, pixelX = 0, pixelY = 0;
	if ("detail" in event) spinY = event.detail;
	if ("wheelDelta" in event) spinY = -event.wheelDelta / 120;
	if ("wheelDeltaY" in event) spinY = -event.wheelDeltaY / 120;
	if ("wheelDeltaX" in event) spinX = -event.wheelDeltaX / 120;
	if ("axis" in event && event.axis === event.HORIZONTAL_AXIS) {
		spinX = spinY;
		spinY = 0;
	}
	pixelX = spinX * PIXEL_STEP;
	pixelY = spinY * PIXEL_STEP;
	if ("deltaY" in event) pixelY = event.deltaY;
	if ("deltaX" in event) pixelX = event.deltaX;
	if ((pixelX || pixelY) && event.deltaMode) {
		if (event.deltaMode === 1) { // LINE
			pixelX *= LINE_HEIGHT;
			pixelY *= LINE_HEIGHT;
		} else if (event.deltaMode === 2) { // PAGE
			pixelX *= PAGE_HEIGHT;
			pixelY *= PAGE_HEIGHT;
		}
	}
	if (pixelX && !spinX) spinX = pixelX < 1 ? -1 : 1;
	if (pixelY && !spinY) spinY = pixelY < 1 ? -1 : 1;
	return { spinX, spinY, pixelX, pixelY };
}

// Store: Viewport and device info for Pooja Kanala's Portfolio
const PortfolioStore = {
	width: window.innerWidth,
	height: window.innerHeight,
	isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)
};

// Simple WebGL slider for Pooja Kanala's Portfolio
class PortfolioWebGLSlider {
	constructor(options) {
		this.scene = new THREE.Scene();
		this.vertexShader = options.vertex || "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }";
		this.fragmentShader = options.fragment;
		this.material = options.material;
		this.uniforms = options.uniforms;
		this.renderer = new THREE.WebGLRenderer();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);
		this.renderer.setClearColor(0x232e6a, 1);
		this.container = document.getElementById("portfolio-canvas-slider");
		this.images = Array.from(document.querySelectorAll(".portfolio-slide-img"));
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.container.appendChild(this.renderer.domElement);
		this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.001, 1000);
		this.camera.position.set(0, 0, 2);
		this.current = 0;
		this.textures = [];
		this.isRunning = false;
		this.paused = true;
		this.onTexturesLoaded = null;
		this._loadTextures(() => {
			this._setupResize();
			this._addObjects();
			this._resize();
			if (this.onTexturesLoaded) this.onTexturesLoaded();
			this.play();
		});
	}

	_loadTextures(callback) {
		const promises = [];
		this.images.forEach((img, idx) => {
			promises.push(new Promise(resolve => {
				this.textures[idx] = new THREE.TextureLoader().load(img.src, resolve);
			}));
		});
		Promise.all(promises).then(callback);
	}

	_setupResize() {
		window.addEventListener("resize", this._resize.bind(this));
	}

	_resize() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.renderer.setSize(this.width, this.height);
		this.camera.aspect = this.width / this.height;
		this.imageAspect = this.textures[0].image.height / this.textures[0].image.width;
		let scaleX, scaleY;
		if (this.height / this.width > this.imageAspect) {
			scaleX = this.width / this.height * this.imageAspect;
			scaleY = 1;
		} else {
			scaleX = 1;
			scaleY = this.height / this.width / this.imageAspect;
		}
		if (this.material && this.material.uniforms && this.material.uniforms.resolution) {
			this.material.uniforms.resolution.value.x = this.width;
			this.material.uniforms.resolution.value.y = this.height;
			this.material.uniforms.resolution.value.z = scaleX;
			this.material.uniforms.resolution.value.w = scaleY;
		}
		let camZ = this.camera.position.z;
		this.camera.fov = 2 * (180 / Math.PI) * Math.atan(1 / (2 * camZ));
		if (this.plane) {
			this.plane.scale.x = this.camera.aspect;
			this.plane.scale.y = 1;
		}
		this.camera.updateProjectionMatrix();
	}

	_addObjects() {
		const patternImg = document.getElementById("portfolio-webgl-slider")?.getAttribute("data-pattern-img");
		const dispTexture = patternImg ? new THREE.TextureLoader().load(patternImg) : null;
		if (dispTexture) dispTexture.wrapS = dispTexture.wrapT = THREE.RepeatWrapping;
		this.material = new THREE.ShaderMaterial({
			uniforms: {
				effectFactor: { type: "f", value: 0.15 },
				dispFactor: { type: "f", value: 0 },
				currentImage: { type: "t", value: this.textures[0] },
				nextImage: { type: "t", value: this.textures[1] },
				disp: { type: "t", value: dispTexture },
				resolution: { type: "v4", value: new THREE.Vector4() }
			},
			vertexShader: this.vertexShader,
			fragmentShader: this.fragmentShader,
			transparent: true,
			opacity: 1
		});
		this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
		this.plane = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.plane);
	}

	stop() {
		this.paused = true;
	}

	play() {
		this.paused = false;
		this._render();
	}

	_render() {
		if (!this.paused) {
			requestAnimationFrame(this._render.bind(this));
			this.renderer.render(this.scene, this.camera);
		}
	}
}

// Move PortfolioSlider class definition outside of PortfolioWebGLSlider
class PortfolioSlider {
	constructor(element, options = {}) {
		this._bindMethods();

		// Element selection
		if (this._isElement(element)) {
			this.element = element;
			this.element.portfolio_slider = this;
		} else {
			const elements = document.querySelectorAll(element);
			for (let i = 0; i < elements.length; i++) {
				if (i === 0) {
					this.element = elements[i];
					this.element.portfolio_slider = this;
				} else {
					new PortfolioSlider(elements[i], options);
				}
			}
		}

		// Default options
		this.options = Object.assign({
			debug: false,
			direction: "horizontal",
			eventTarget: ".portfolio-slider",
			outer: ".portfolio-slider",
			inner: ".portfolio-slider-viewport",
			slides: ".portfolio-slide",
			clones: "portfolio-slide-clone",
			snap: false,
			snapwait: { before: 10, after: 80 },
			autoplay: false,
			speed: 2,
			threshold: 50,
			ease: 0.075,
			click: false,
			mousewheel: true,
			navigation: true,
			pagination: true,
			renderBullet: null,
			webgl: false,
			webgl_direction: "horizontal",
			parallax: null,
			rotate: null,
			opacity: null,
			scale: null,
			on: {
				init: null,
				activeSlideChange: null,
				slideEnterViewport: null,
				slideLeaveViewport: null,
				slideEnter: null,
				slideLeave: null
			}
		}, options);

		// DOM references
		this.eventTarget = this.element.querySelector(this.options.eventTarget);
		this.inner = this.element.querySelector(this.options.inner);
		this.outer = this.element.querySelector(this.options.outer);

		// Navigation buttons
		this.buttonNext = null;
		this.buttonPrev = null;
		if (this._isObject(this.options.navigation) || this.options.navigation === true) {
			this.buttonNext = this.element.querySelector(".portfolio-button-next");
			this.buttonPrev = this.element.querySelector(".portfolio-button-prev");
		}
		if (this._isObject(this.options.navigation)) {
			this.buttonNext = document.querySelector(this.options.navigation.nextEl);
			this.buttonPrev = document.querySelector(this.options.navigation.prevEl);
		}
		if (this.buttonNext) this.buttonNext.addEventListener("click", this._debounce(this.onNext, 50));
		if (this.buttonPrev) this.buttonPrev.addEventListener("click", this._debounce(this.onPrev, 50));

		// Pagination
		this.pagination = null;
		if (this._isObject(this.options.pagination) || this.options.pagination === true) {
			this.pagination = this.element.querySelector(".portfolio-pagination");
		}
		if (this._isObject(this.options.pagination)) {
			this.pagination = this.element.querySelector(this.options.navigation.el);
		}

		// Viewport
		this.viewportHeight = PortfolioStore.height;
		this.viewportWidth = PortfolioStore.width;
		this.viewportTop = 0;
		this.viewportLeft = 0;

		// State
		this.state = {
			target: 0,
			current: 0,
			currentRounded: 0,
			prevRounded: 0,
			currentMovingDirection: 0,
			currentSlideItem: null,
			moveOffset: 0,
			y: 0,
			on: { x: 0, y: 0 },
			off: 0,
			progress: 0,
			diff: 0,
			flags: {
				mousedown: false,
				dragging: false,
				click: true,
				resizing: false
			}
		};

		// Items
		this.items = [];
		this.initialItems = [];
		this.clonedItems = [];
		this.paginationItems = [];
		this.timeline = null;

		// Events
		this.events = {
			move: PortfolioStore.isMobileDevice ? "touchmove" : "mousemove",
			up: PortfolioStore.isMobileDevice ? "touchend" : "mouseup",
			down: PortfolioStore.isMobileDevice ? "touchstart" : "mousedown",
			click: "click",
			wheel: "wheel",
			mousewheel: "mousewheel",
			resize: "resize"
		};

		this.enabled = true;
		this.length = 0;

		// Updater
		this.updater = gsap.set(this.updateUI, {
			delay: 0.2,
			onRepeat: this.updateUI,
			repeat: -1,
			repeatDelay: 0.2
		});

		// Wheel snap events
		this.wheelSnapEvents = { tsSnap: null, events: [] };

		// WebGL
		this.webglCanvas = null;

		// Initialize
		this.init();

		// Store instance
		PortfolioSlider.instances.push(this);
	}

	_bindMethods() {
		[
			"onDown", "onMove", "onUp", "onClick", "onWheel", "onResize",
			"onPagination", "onPrev", "onNext", "updateUI", "updateWheelSnap", "tick"
		].forEach(fn => this[fn] = this[fn].bind(this));
	}

	init() {
		gsap.utils.pipe(this.setup(), this.setupEvents());
	}

	// Helper methods
	_isObject(obj) {
		return obj instanceof Object && !Array.isArray(obj) && obj !== null;
	}

	_isElement(obj) {
		return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
			obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string");
	}

	_debounce(fn, delay) {
		let timeout;
		return (...args) => {
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(() => fn(...args), delay);
		};
	}
	// Store all PortfolioSlider instances
	// (Already set at the top of the file, so this line is not needed here)
}

// Register event handler
PortfolioSlider.prototype.on = function(event, handler) {
	this.options.on[event] = handler;
};

// Remove all event listeners and cleanup
PortfolioSlider.prototype.destroy = function() {
	this.removeEvents();
	this.state = null;
	this.items = null;
	this.options = null;
	this.ui = null;
};

// Setup all event listeners
PortfolioSlider.prototype.setupEvents = function() {
	const { move, up, down, resize, wheel, mousewheel } = this.events;
	const eventTarget = this.eventTarget;
	if (eventTarget) {
		eventTarget.addEventListener(down, this.onDown);
		eventTarget.addEventListener(move, this.onMove);
		if (this.options.mousewheel) {
			eventTarget.addEventListener(wheel, this.onWheel);
			eventTarget.addEventListener(mousewheel, this.onWheel);
		}
		window.addEventListener(up, this.onUp);
	}
	window.addEventListener(resize, this._debounce(this.onResize, 250));
};

// Remove all event listeners
PortfolioSlider.prototype.removeEvents = function() {
	const { move, up, down, resize, wheel, mousewheel } = this.events;
	const eventTarget = this.eventTarget;
	if (eventTarget) {
		eventTarget.removeEventListener(down, this.onDown);
		eventTarget.removeEventListener(move, this.onMove);
		if (this.options.mousewheel) {
			eventTarget.removeEventListener(wheel, this.onWheel);
			eventTarget.removeEventListener(mousewheel, this.onWheel);
		}
		window.removeEventListener(up, this.onUp);
	}
	if (this.buttonNext) this.buttonNext.removeEventListener("click", this._debounce(this.onNext, 50));
	if (this.buttonPrev) this.buttonPrev.removeEventListener("click", this._debounce(this.onPrev, 50));
	if (this.element && this.options.click !== false) this.element.removeEventListener("click", this.onClick);
	window.removeEventListener(resize, this._debounce(this.onResize, 250));
	if (this.updater) this.updater.kill();
	this.updater = null;
	gsap.ticker.remove(this.tick);
	clearInterval(this.threadAutoplay);
};

// Get viewport size (width or height)
PortfolioSlider.prototype.viewportSize = function() {
	return this.options.direction === "vertical" ? this.vh : this.vw;
};

// Get viewport shift (top or left)
PortfolioSlider.prototype.viewportShift = function() {
	return this.options.direction === "vertical" ? this.vshifth : this.vshiftw;
};

// Setup slider structure and items
PortfolioSlider.prototype.setup = function() {
	if (this.element) {
		const rect = this.element.getBoundingClientRect();
		this.vh = rect.height;
		this.vw = rect.width;
		this.vshifth = rect.top;
		this.vshiftw = rect.left;
	}
	// Slides and clones
	const slides = this.inner.querySelectorAll(this.options.slides);
	let cloneCount = 1;
	for (let i = slides.length - 1; i >= 0; i--) {
		const slide = slides[i];
		const clone = slide.cloneNode(true);
		if (this.options.direction === "vertical") {
			slide.style.top = (100 * i) + "%";
			clone.style.top = -(100 * cloneCount) + "%";
			clone.classList.add(this.options.clones);
			this.inner.append(clone);
		} else {
			slide.style.left = (100 * i) + "%";
			clone.style.left = -(100 * cloneCount) + "%";
			clone.classList.add(this.options.clones);
			this.inner.prepend(clone);
		}
		cloneCount++;
	}
	// Pagination
	if (this.pagination) {
		for (let i = 0; i < slides.length; i++) {
			const bullet = document.createElement("div");
			bullet.classList.add("portfolio-pagination-bullet");
			if (typeof this.options.renderBullet === "function") {
				bullet.innerHTML = this.options.renderBullet();
			}
			this.pagination.appendChild(bullet);
			bullet.addEventListener("click", this.onPagination);
			this.paginationItems.push({ el: bullet });
		}
	}
	// GSAP timeline
	this.timeline = gsap.timeline({ paused: true, defaults: { duration: 1, ease: "linear" } });
	// Collect all items (slides and clones)
	const allSlides = this.inner.querySelectorAll(this.options.slides);
	for (let i = 0; i < allSlides.length; i++) {
		const slide = allSlides[i];
		const rect = slide.getBoundingClientRect();
		let item;
		if (this.options.direction === "vertical") {
			item = { el: slide, start: rect.top, end: rect.bottom, length: rect.height, translate: 0 };
			this.length += rect.height;
		} else {
			item = { el: slide, start: rect.left, end: rect.right, length: rect.width, translate: 0 };
			this.length += rect.width;
		}
		if (slide.classList.contains(this.options.clones)) {
			this.clonedItems.push(item);
			item.clone = true;
		} else {
			this.initialItems.push(item);
			item.clone = false;
		}
		this.items.push(item);
	}
	// Reverse cloned items for vertical
	if (this.options.direction === "vertical") this.clonedItems.reverse();
	// Link prev/next for items
	const total = slides.length;
	if (this.options.direction === "vertical") {
		for (let i = 0; i < total; i++) {
			const item = this.items[i];
			item.prevElement = i === 0 ? this.items[total] : this.items[i - 1];
			item.nextElement = i === total - 1 ? this.items[this.items.length - 1] : this.items[i + 1];
		}
		for (let i = this.items.length - 1; i >= total; i--) {
			const item = this.items[i];
			item.prevElement = i === this.items.length - 1 ? this.items[total - 1] : this.items[i + 1];
			item.nextElement = i === total ? this.items[0] : this.items[i - 1];
		}
	} else {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];
			item.prevElement = i === 0 ? this.items[this.items.length - 1] : this.items[i - 1];
			item.nextElement = i === this.items.length - 1 ? this.items[0] : this.items[i + 1];
		}
	}
	// Setup parallax/rotate/opacity/scale element lists
	for (let i = 0; i < this.items.length; i++) {
		const item = this.items[i];
		// Parallax
		if (Array.isArray(this.options.parallax)) {
			for (let j = 0; j < this.options.parallax.length; j++) {
				const parallax = this.options.parallax[j];
				if (parallax.element !== undefined && parallax.margin !== undefined) {
					item.elParallaxList = item.el.querySelectorAll(parallax.element);
				}
			}
		}
		// Rotate
		if (Array.isArray(this.options.rotate)) {
			for (let j = 0; j < this.options.rotate.length; j++) {
				const rotate = this.options.rotate[j];
				if (rotate.element !== undefined && rotate.factor !== undefined) {
					item.elRotateList = item.el.querySelectorAll(rotate.element);
				}
			}
		}
		// Opacity
		if (Array.isArray(this.options.opacity)) {
			for (let j = 0; j < this.options.opacity.length; j++) {
				const opacity = this.options.opacity[j];
				if (opacity.element !== undefined && opacity.factor !== undefined) {
					item.elOpacityList = item.el.querySelectorAll(opacity.element);
				}
			}
		}
		// Scale
		if (Array.isArray(this.options.scale)) {
			for (let j = 0; j < this.options.scale.length; j++) {
				const scale = this.options.scale[j];
				if (scale.element !== undefined && scale.factor !== undefined) {
					item.elScaleList = item.el.querySelectorAll(scale.element);
				}
			}
		}
	}
	// Click event
	if (this.element && this.options.click !== false) {
		this.element.addEventListener("click", this.onClick);
	}
	// Setup WebGL if enabled
	this.setupWebGL();
	// Start GSAP ticker
	gsap.ticker.add(this.tick);
		// Autoplay
		this.threadAutoplay = null;
		if (this.options.autoplay) {
			let interval = 5000;
			if (this.isObject(this.options.autoplay) && this.options.autoplay.hasOwnProperty("speed")) {
				interval = this.options.autoplay.speed;
			}
			if (interval >= 500) {
				this.threadAutoplay = setInterval(this.onNext, interval);
			}
		}
		// End of setup method
	}

		// Handle mouse wheel event for slider navigation
		PortfolioSlider.prototype.onWheel = function(event) {
			if (!this.enabled) return;
			const now = performance.now();
			const state = this.state;
			const wheel = normalizeWheel(event);
			const delta = 0.2 * wheel.pixelY;
			const { x, y } = this.getPointerPosition(event);

			state.flags.dragging = false;
			const { off, on } = state;

			if (this.options.debug) {
				console.log(`Wheel event at ${now}, delta: ${delta}`);
			}

			// Snap logic for wheel events
			if (this.options.snap && this.wheelSnapEvents.tsSnap !== null) {
				if (now - this.wheelSnapEvents.tsSnap <= this.options.snapwait.after) {
					if (this.options.debug) {
						console.log("Ignoring wheel event due to ongoing snapping");
					}
					return;
				}
				this.wheelSnapEvents.tsSnap = null;
				this.wheelSnapEvents.events = [];
			}

			state.target -= delta * this.options.speed;
			if (this.options.snap) {
				this.wheelSnapEvents.events.push({
					ts: now,
					delta: delta,
					currentTarget: state.target
				});
			}
			if (this.options.direction === "vertical") {
				on.y = state.target;
			} else {
				on.x = state.target;
			}
			state.off = state.target;
		};

		// Update snapping after wheel events
		PortfolioSlider.prototype.updateWheelSnap = function() {
			if (this.options.snap && this.wheelSnapEvents.events.length > 0) {
				const now = performance.now();
				const lastEvent = this.wheelSnapEvents.events[this.wheelSnapEvents.events.length - 1];
				if (now - lastEvent.ts > this.options.snapwait.before) {
					const state = this.state;
					const { off, on } = state;
					const startTarget = this.wheelSnapEvents.events[0].currentTarget;
					state.target = this.snapTargetOnWheel(startTarget, state.target);
					if (this.options.direction === "vertical") {
						on.y = state.target;
					} else {
						on.x = state.target;
					}
					state.off = state.target;
					this.wheelSnapEvents.tsSnap = now;
					this.wheelSnapEvents.events = [];
				}
			}
		};

		// Setup WebGL slider if enabled
		PortfolioSlider.prototype.setupWebGL = function() {
			if (!this.options.webgl) return;

			const vertexShader = `
				varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`;

			const fragmentShader = `
				varying vec2 vUv;
				uniform sampler2D currentImage;
				uniform sampler2D nextImage;
				uniform sampler2D disp;
				uniform float dispFactor;
				uniform float effectFactor;
				uniform vec4 resolution;

				void main() {
					vec2 uv = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
					vec4 dispTex = texture2D(disp, uv);

					${this.options.webgl_direction === "horizontal"
						? `
						vec2 distortedPosition = vec2(uv.x + dispFactor * (dispTex.r * effectFactor), uv.y);
						vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (dispTex.r * effectFactor), uv.y);
						`
						: `
						vec2 distortedPosition = vec2(uv.x, uv.y - dispFactor * (dispTex.r * effectFactor));
						vec2 distortedPosition2 = vec2(uv.x, uv.y + (1.0 - dispFactor) * (dispTex.r * effectFactor));
						`
					}

					vec4 current = texture2D(currentImage, distortedPosition);
					vec4 next = texture2D(nextImage, distortedPosition2);
					vec4 finalTexture = mix(current, next, dispFactor);

					gl_FragColor = finalTexture;
				}
			`;

			this.webglSlider = new PortfolioWebGLSlider({
				vertex: vertexShader,
				fragment: fragmentShader
			});
			this.webglSlider.isRunning = false;

			// Setup GSAP timeline for transitions
			const slider = this;
			const webgl = this.webglSlider;
			const slideCount = webgl.images.length;
			const slideDuration = 1 / slideCount;

			webgl.onTexturesLoaded = function() {
				webgl.material.uniforms.nextImage.value = webgl.textures[0];
				webgl.material.uniforms.nextImage.needsUpdate = true;
				slider.timeline = gsap.timeline({ paused: true });

				for (let i = 0; i < slideCount; i++) {
					const nextIdx = (i + 1) % slideCount;
					slider.timeline
						.to({}, { duration: slideDuration / 2 })
						.call(() => {
							webgl.material.uniforms.currentImage.value = webgl.textures[i];
							webgl.material.uniforms.currentImage.needsUpdate = true;
							webgl.material.uniforms.nextImage.value = webgl.textures[nextIdx];
							webgl.material.uniforms.nextImage.needsUpdate = true;
							webgl.material.uniforms.dispFactor.value = 0;
						})
						.to(webgl.material.uniforms.dispFactor, {
							duration: slideDuration,
							value: 1,
							ease: "Sine.easeInOut"
						});
				}
			};
		};

		// Utility: debounce function
		PortfolioSlider.prototype.debounce = function(fn, delay) {
			let timeout;
			return function (...args) {
				if (timeout) clearTimeout(timeout);
				timeout = setTimeout(() => fn.apply(this, args), delay);
			};
		};

		// Utility: check if object is a plain object
		PortfolioSlider.prototype.isObject = function(obj) {
			return obj && typeof obj === "object" && !Array.isArray(obj);
		};

		// Utility: check if object is a DOM element
		PortfolioSlider.prototype.isElement = function(obj) {
			return obj instanceof HTMLElement;
		};

		// Utility: log if debug enabled
		PortfolioSlider.prototype.log = function(msg) {
			if (this.options.debug) {
				console.log(msg);
			}
		};

		// Store all PortfolioSlider instances
		PortfolioSlider.instances = [];