import * as THREE from 'three';

/**
 * ============================================================================
 * PaperCraft & Co. — Pro 3D Packaging Studio & E-Commerce Cart Engine (INR)
 * Features: Explode View, Custom Logo Upload, Foil Shaders, Camera Presets,
 * Lighting Presets, 4 Silhouettes, High-Res Mockup Export, Volume Tier Pricing.
 * ============================================================================
 */

// Wholesale Product Catalogue Data in Indian Rupees (INR ₹)
const CATALOGUE_PRODUCTS = [
  {
    id: 'cup-12oz-dw',
    category: 'cups',
    name: '12oz Double-Wall Kraft Cup',
    desc: 'Insulated corrugated outer wall for piping hot filter coffee, chai & flat whites with zero sleeve required.',
    price: 4.50,
    unit: 'per unit',
    pack: 'Carton of 500 (₹2,250)',
    badge: 'BESTSELLER',
    modelType: 'cup',
    tone: 'kraft',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'cup-8oz-sw',
    category: 'cups',
    name: '8oz Artisan Coffee Cup',
    desc: 'Compact single-wall cup made from unbleached virgin spruce pulp with compostable corn-PLA barrier.',
    price: 3.20,
    unit: 'per unit',
    pack: 'Carton of 1,000 (₹3,200)',
    badge: 'ECO CHOICE',
    modelType: 'cup',
    tone: 'bleached',
    image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bag-twisted-handle',
    category: 'bags',
    name: 'Twisted-Handle Kraft Tote',
    desc: 'Heavy-duty 120 GSM reinforced paper bag with twisted cord handles for cafes, sweetshops & boutiques.',
    price: 8.50,
    unit: 'per unit',
    pack: 'Carton of 250 (₹2,125)',
    badge: 'HEAVY DUTY',
    modelType: 'bag',
    tone: 'kraft',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'bag-grocery-flat',
    category: 'bags',
    name: 'Gusseted Bakery Paper Bag',
    desc: 'Self-standing block bottom design engineered for sourdough loaves, samosas, and roasted coffee beans.',
    price: 5.50,
    unit: 'per unit',
    pack: 'Carton of 500 (₹2,750)',
    badge: 'GREASEPROOF',
    modelType: 'bag',
    tone: 'espresso',
    image: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tissue-cube-box',
    category: 'tissue',
    name: 'Bespoke Tissue Dispenser Box',
    desc: 'Premium 100% bamboo unbleached facial tissue in a recyclable geometric dispenser carton.',
    price: 24.00,
    unit: 'per unit',
    pack: 'Case of 48 boxes (₹1,152)',
    badge: 'LUXURY 3-PLY',
    modelType: 'tissue',
    tone: 'forest',
    image: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tissue-dinner-napkins',
    category: 'tissue',
    name: 'Embossed Kraft Serviettes',
    desc: 'Soft textured 2-ply dinner napkins featuring organic waffle embossing and water-based soy ink printing.',
    price: 0.85,
    unit: 'per unit',
    pack: 'Pack of 1,000 (₹850)',
    badge: '100% RECYCLED',
    modelType: 'tissue',
    tone: 'kraft',
    image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'box-clamshell-burger',
    category: 'boxes',
    name: 'Bio-Clamshell Meal Box',
    desc: 'Breathable, grease-resistant corrugated micro-flute box keeping hot sandwiches, burgers & dosas crisp.',
    price: 6.50,
    unit: 'per unit',
    pack: 'Carton of 300 (₹1,950)',
    badge: 'VENTED LID',
    modelType: 'box',
    tone: 'kraft',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'box-pastry-window',
    category: 'boxes',
    name: 'Windowed Pastry & Mithai Box',
    desc: 'Clear biodegradable cellulose plant-based window with lock-in corner tabs for artisan sweets & pastries.',
    price: 9.50,
    unit: 'per unit',
    pack: 'Carton of 200 (₹1,900)',
    badge: 'PLANT WINDOW',
    modelType: 'tissue',
    tone: 'bleached',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
  }
];

// Shopping Cart State Manager with INR (₹) Formatting
class CartManager {
  constructor() {
    this.items = [];
    this.badgeEl = document.getElementById('cart-counter');
    this.drawerEl = document.getElementById('cart-drawer');
    this.itemsListEl = document.getElementById('cart-items-list');
    this.subtotalEl = document.getElementById('cart-subtotal');
    this.totalEl = document.getElementById('cart-total');

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const openBtn = document.getElementById('btn-open-cart');
    const closeBtn = document.getElementById('btn-close-cart');

    if (openBtn) openBtn.addEventListener('click', () => this.open());
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    if (this.drawerEl) {
      this.drawerEl.addEventListener('click', (e) => {
        if (e.target === this.drawerEl) this.close();
      });
    }

    const checkoutBtn = document.getElementById('btn-cart-checkout');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.close();
        const modal = document.getElementById('quote-modal');
        if (modal) modal.classList.add('open');
      });
    }
  }

  open() {
    if (this.drawerEl) this.drawerEl.classList.add('open');
  }

  close() {
    if (this.drawerEl) this.drawerEl.classList.remove('open');
  }

  addItem(item) {
    const existingIndex = this.items.findIndex(
      (i) => i.id === item.id && i.specs === item.specs
    );

    if (existingIndex > -1) {
      this.items[existingIndex].qty += item.qty || 1;
    } else {
      this.items.push({
        ...item,
        qty: item.qty || 1
      });
    }

    this.render();
    this.open();
  }

  updateQty(index, delta) {
    if (!this.items[index]) return;
    this.items[index].qty += delta;
    if (this.items[index].qty <= 0) {
      this.items.splice(index, 1);
    }
    this.render();
  }

  removeItem(index) {
    this.items.splice(index, 1);
    this.render();
  }

  render() {
    const totalCount = this.items.reduce((sum, item) => sum + item.qty, 0);
    if (this.badgeEl) this.badgeEl.textContent = totalCount;

    if (!this.itemsListEl) return;

    if (this.items.length === 0) {
      this.itemsListEl.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon">☕</div>
          <h4 class="empty-title">Your Packaging Order is Empty</h4>
          <p>Browse our catalogue or customize a bespoke 3D paper product above to add cartons to your order.</p>
        </div>
      `;
      if (this.subtotalEl) this.subtotalEl.textContent = '₹0.00';
      if (this.totalEl) this.totalEl.textContent = '₹0.00';
      return;
    }

    let subtotal = 0;
    this.itemsListEl.innerHTML = this.items
      .map((item, idx) => {
        const itemTotal = item.unitPrice * (item.cartonUnits || 500) * item.qty;
        subtotal += itemTotal;

        return `
          <div class="cart-item-row">
            <img src="${item.thumb || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80'}" alt="${item.name}" class="cart-item-thumb">
            <div class="cart-item-details">
              <span class="cart-item-title">${item.name}</span>
              <span class="cart-item-specs">${item.specs}</span>
              <span class="cart-item-price">₹${itemTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <small>(${item.qty} carton${item.qty > 1 ? 's' : ''})</small></span>
              <div class="cart-qty-controls">
                <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
                <span class="qty-count">${item.qty}</span>
                <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
              </div>
            </div>
            <button class="btn-remove-item" data-action="remove" data-idx="${idx}" title="Remove">&times;</button>
          </div>
        `;
      })
      .join('');

    this.itemsListEl.querySelectorAll('.qty-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        const action = e.currentTarget.getAttribute('data-action');
        this.updateQty(idx, action === 'inc' ? 1 : -1);
      });
    });

    this.itemsListEl.querySelectorAll('.btn-remove-item').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
        this.removeItem(idx);
      });
    });

    const formatted = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (this.subtotalEl) this.subtotalEl.textContent = formatted;
    if (this.totalEl) this.totalEl.textContent = formatted;
  }
}

// 3D Packaging Visualizer Engine Pro
class PaperCraft3DStudio {
  constructor(cartManager) {
    this.cart = cartManager;
    this.canvas = document.getElementById('customizer-canvas');
    if (!this.canvas) return;

    this.tones = {
      kraft: { hex: 0xc89d66, roughness: 0.85, name: 'Natural Unbleached Kraft' },
      bleached: { hex: 0xf5eee6, roughness: 0.8, name: 'Oatmeal Virgin White' },
      forest: { hex: 0x2c4a3e, roughness: 0.78, name: 'Botanical Forest Green' },
      espresso: { hex: 0x4a2e18, roughness: 0.82, name: 'Roasted Espresso Brown' }
    };

    this.inks = {
      coffee: '#38220F',
      green: '#2C4A3E',
      gold: '#B8860B',
      white: '#FFFFFF'
    };

    this.emblems = {
      origami: '🕊️',
      coffee: '☕',
      botanical: '🌿',
      diamond: '◈',
      crest: '👑'
    };

    this.basePrices = {
      cup: 4.50,
      bag: 8.50,
      tissue: 24.00,
      box: 6.50
    };

    this.state = {
      product: 'cup', // 'cup', 'bag', 'tissue', 'box'
      tone: 'kraft',
      finish: 'matte', // 'matte', 'goldFoil', 'emboss'
      brandText: 'ROASTED & CO.',
      tagline: 'SPECIALTY BREWS • EST. 2026',
      emblem: 'origami',
      uploadedImage: null,
      ink: 'coffee',
      size: '12oz',
      hasSleeve: true,
      hasLid: true,
      autoRotate: true,
      isExploded: false,
      explodeProgress: 0.0,
      lighting: 'warm',
      volumeUnits: 500,
      unitPrice: 4.50,
      isDragging: false
    };

    this.pointer = { x: 0, y: 0, prevX: 0, prevY: 0 };
    this.cameraTargetPos = new THREE.Vector3(0, 0.6, 7.5);

    this.initScene();
    this.initCamera();
    this.initRenderer();
    this.initLights();
    this.initProceduralModels();
    this.updateBrandTexture();
    this.bindEvents();
    this.updatePricingCalculations();
    this.animate();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = null;
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      38,
      this.canvas.clientWidth / this.canvas.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0.6, 7.5);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true, // Allows saving high-res screenshot mockup
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
  }

  initLights() {
    this.ambientLight = new THREE.AmbientLight(0xfaf6f0, 2.3);
    this.scene.add(this.ambientLight);

    this.keyLight = new THREE.DirectionalLight(0xfff5ea, 2.6);
    this.keyLight.position.set(4, 6, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.scene.add(this.keyLight);

    this.rimLight = new THREE.DirectionalLight(0xe8d8c8, 1.4);
    this.rimLight.position.set(-4, 3, -3);
    this.scene.add(this.rimLight);

    const floorGeo = new THREE.PlaneGeometry(24, 24);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.12 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.1;
    floor.receiveShadow = true;
    this.scene.add(floor);
  }

  setLightingMood(mode) {
    this.state.lighting = mode;
    if (mode === 'warm') {
      this.ambientLight.color.setHex(0xfaf6f0);
      this.ambientLight.intensity = 2.3;
      this.keyLight.color.setHex(0xfff2e0);
      this.rimLight.color.setHex(0xe8d8c8);
    } else if (mode === 'daylight') {
      this.ambientLight.color.setHex(0xf0fdf4);
      this.ambientLight.intensity = 2.5;
      this.keyLight.color.setHex(0xffffff);
      this.rimLight.color.setHex(0x99f6e4);
    } else if (mode === 'dramatic') {
      this.ambientLight.color.setHex(0x241d17);
      this.ambientLight.intensity = 1.2;
      this.keyLight.color.setHex(0xffffff);
      this.keyLight.intensity = 3.6;
      this.rimLight.color.setHex(0x8b5a2b);
      this.rimLight.intensity = 2.2;
    }
  }

  /* --------------------------------------------------------------------------
   * 4 Realistic Procedural Packaging Models:
   * 1. Cup, 2. Bag, 3. Tissue Box, 4. Clamshell Burger/Meal Box
   * ------------------------------------------------------------------------ */
  initProceduralModels() {
    this.modelGroup = new THREE.Group();
    this.scene.add(this.modelGroup);

    this.brandCanvas = document.createElement('canvas');
    this.brandCanvas.width = 1024;
    this.brandCanvas.height = 1024;
    this.brandTexture = new THREE.CanvasTexture(this.brandCanvas);
    this.brandTexture.wrapS = THREE.RepeatWrapping;
    this.brandTexture.wrapT = THREE.RepeatWrapping;

    const curTone = this.tones[this.state.tone];

    this.paperMaterial = new THREE.MeshStandardMaterial({
      color: curTone.hex,
      roughness: curTone.roughness,
      metalness: 0.04,
      map: this.brandTexture
    });

    this.sleeveMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5a2b,
      roughness: 0.92,
      metalness: 0.02
    });

    this.lidMaterial = new THREE.MeshStandardMaterial({
      color: 0xfdfaf5,
      roughness: 0.45,
      metalness: 0.08
    });

    // 1. PAPER CUP GROUP
    this.cupGroup = new THREE.Group();

    // Inner White PLA liner
    const cupInnerGeo = new THREE.CylinderGeometry(1.32, 0.92, 3.16, 48, 1, true);
    const cupInnerMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
    this.cupInnerMesh = new THREE.Mesh(cupInnerGeo, cupInnerMat);
    this.cupInnerMesh.position.y = 0.02;
    this.cupGroup.add(this.cupInnerMesh);

    // Outer printed cup body
    const cupGeo = new THREE.CylinderGeometry(1.35, 0.95, 3.2, 48, 1, true);
    this.cupMesh = new THREE.Mesh(cupGeo, this.paperMaterial);
    this.cupMesh.castShadow = true;
    this.cupMesh.receiveShadow = true;
    this.cupGroup.add(this.cupMesh);

    // Bottom seal
    const cupBottomGeo = new THREE.CircleGeometry(0.95, 48);
    const cupBottom = new THREE.Mesh(cupBottomGeo, this.paperMaterial);
    cupBottom.rotation.x = Math.PI / 2;
    cupBottom.position.y = -1.6;
    this.cupGroup.add(cupBottom);

    // Top rim roll
    const rimGeo = new THREE.TorusGeometry(1.35, 0.065, 16, 48);
    const rimMesh = new THREE.Mesh(rimGeo, this.paperMaterial);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 1.6;
    this.cupGroup.add(rimMesh);

    // Corrugated fluted heat sleeve
    const sleeveGeo = new THREE.CylinderGeometry(1.23, 1.05, 1.45, 48);
    this.sleeveMesh = new THREE.Mesh(sleeveGeo, this.sleeveMaterial);
    this.sleeveMesh.position.y = -0.15;
    this.sleeveMesh.castShadow = true;
    this.cupGroup.add(this.sleeveMesh);

    // Sipping lid with raised drinking spout
    this.lidSubGroup = new THREE.Group();
    const lidBaseGeo = new THREE.CylinderGeometry(1.42, 1.38, 0.35, 48);
    const lidBase = new THREE.Mesh(lidBaseGeo, this.lidMaterial);
    lidBase.castShadow = true;
    this.lidSubGroup.add(lidBase);

    // Drinking spout detail
    const spoutGeo = new THREE.BoxGeometry(0.4, 0.12, 0.25);
    const spoutMesh = new THREE.Mesh(spoutGeo, this.lidMaterial);
    spoutMesh.position.set(0, 0.22, 1.05);
    this.lidSubGroup.add(spoutMesh);

    this.lidSubGroup.position.y = 1.75;
    this.cupGroup.add(this.lidSubGroup);

    this.modelGroup.add(this.cupGroup);

    // 2. PAPER BAG GROUP
    this.bagGroup = new THREE.Group();
    const bagGeo = new THREE.BoxGeometry(2.4, 3.2, 1.4);
    this.bagMesh = new THREE.Mesh(bagGeo, this.paperMaterial);
    this.bagMesh.castShadow = true;
    this.bagMesh.receiveShadow = true;
    this.bagGroup.add(this.bagMesh);

    // Twisted Cord Handles
    this.bagHandlesGroup = new THREE.Group();
    const handleCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-0.6, 1.6, 0.72),
      new THREE.Vector3(0, 2.7, 0.72),
      new THREE.Vector3(0.6, 1.6, 0.72)
    );
    const handleGeo = new THREE.TubeGeometry(handleCurve, 24, 0.05, 8, false);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0x654321, roughness: 0.9 });
    const handleFront = new THREE.Mesh(handleGeo, handleMat);
    const handleBack = handleFront.clone();
    handleBack.position.z = -1.44;
    this.bagHandlesGroup.add(handleFront);
    this.bagHandlesGroup.add(handleBack);
    this.bagGroup.add(this.bagHandlesGroup);

    this.bagGroup.visible = false;
    this.modelGroup.add(this.bagGroup);

    // 3. TISSUE DISPENSER BOX GROUP
    this.tissueGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(2.8, 1.5, 1.8);
    this.tissueMesh = new THREE.Mesh(boxGeo, this.paperMaterial);
    this.tissueMesh.castShadow = true;
    this.tissueMesh.receiveShadow = true;
    this.tissueGroup.add(this.tissueMesh);

    // Organic wavy folded paper tissue
    this.tissuePaperGroup = new THREE.Group();
    const tissueGeo = new THREE.CylinderGeometry(0.55, 0.2, 0.85, 20, 6);
    const tissueMat = new THREE.MeshStandardMaterial({ color: 0xfaf6f0, roughness: 0.95 });
    const tissuePaper = new THREE.Mesh(tissueGeo, tissueMat);
    tissuePaper.position.y = 0.95;
    this.tissuePaperGroup.add(tissuePaper);
    this.tissueGroup.add(this.tissuePaperGroup);

    this.tissueGroup.visible = false;
    this.modelGroup.add(this.tissueGroup);

    // 4. CLAMSHELL MEAL / BURGER BOX GROUP (NEW!)
    this.clamshellGroup = new THREE.Group();

    // Bottom Base Tray
    const trayGeo = new THREE.BoxGeometry(2.6, 1.1, 2.6);
    this.clamshellTray = new THREE.Mesh(trayGeo, this.paperMaterial);
    this.clamshellTray.position.y = -0.55;
    this.clamshellTray.castShadow = true;
    this.clamshellTray.receiveShadow = true;
    this.clamshellGroup.add(this.clamshellTray);

    // Top Hinged Lid Group
    this.clamshellLidPivot = new THREE.Group();
    this.clamshellLidPivot.position.set(0, 0, -1.3); // Hinge pivot at back

    const lidBoxGeo = new THREE.BoxGeometry(2.65, 1.15, 2.65);
    this.clamshellLid = new THREE.Mesh(lidBoxGeo, this.paperMaterial);
    this.clamshellLid.position.set(0, 0.58, 1.3);
    this.clamshellLid.castShadow = true;
    this.clamshellLidPivot.add(this.clamshellLid);

    // Front tab lock
    const tabGeo = new THREE.BoxGeometry(0.8, 0.35, 0.08);
    const tabMesh = new THREE.Mesh(tabGeo, this.sleeveMaterial);
    tabMesh.position.set(0, 0.35, 2.65);
    this.clamshellLidPivot.add(tabMesh);

    this.clamshellGroup.add(this.clamshellLidPivot);
    this.clamshellGroup.visible = false;
    this.modelGroup.add(this.clamshellGroup);
  }

  /* --------------------------------------------------------------------------
   * High-Resolution Procedural Brand Texture Painting
   * Supports Custom PNG/JPG Uploads, Presets, and Metallic Foil Glazes
   * ------------------------------------------------------------------------ */
  updateBrandTexture() {
    const ctx = this.brandCanvas.getContext('2d');
    const w = this.brandCanvas.width;
    const h = this.brandCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Subtle paper grain fibers
    ctx.fillStyle = 'rgba(0, 0, 0, 0.025)';
    for (let i = 0; i < 450; i++) {
      ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }

    const inkColor = this.inks[this.state.ink] || '#38220F';
    ctx.fillStyle = inkColor;
    ctx.strokeStyle = inkColor;
    ctx.textAlign = 'center';

    const cx = w * 0.5;
    const cy = h * 0.42;

    // IF USER UPLOADED A CUSTOM LOGO IMAGE FILE:
    if (this.state.uploadedImage) {
      const maxW = 340;
      const maxH = 220;
      const img = this.state.uploadedImage;
      const ratio = Math.min(maxW / img.width, maxH / img.height);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);

      // Custom Subtitle below image
      ctx.font = 'bold 30px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText((this.state.brandText || '').toUpperCase(), cx, cy + drawH / 2 + 45);

      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.fillText(this.state.tagline.toUpperCase(), cx, cy + drawH / 2 + 78);
    } else {
      // PROCEDURAL EMBLEM STAMP MODE:
      // Outer Geometric Hexagonal Origami Shield
      ctx.beginPath();
      ctx.lineWidth = 5;
      const r = 135;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Inner dashed accent ring
      ctx.beginPath();
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 8]);
      ctx.arc(cx, cy, 105, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Selected Artisan Emblem
      const emblemSymbol = this.emblems[this.state.emblem] || '🕊️';
      ctx.font = '54px serif';
      ctx.fillText(emblemSymbol, cx, cy - 28);

      // Custom user brand text
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif';
      ctx.letterSpacing = '4px';
      const text = (this.state.brandText || 'PAPERCRAFT').toUpperCase();
      ctx.fillText(text, cx, cy + 28);

      // Secondary Tagline
      ctx.font = '600 16px "JetBrains Mono", monospace';
      ctx.fillText(this.state.tagline.toUpperCase(), cx, cy + 65);
    }

    this.brandTexture.needsUpdate = true;
  }

  /* --------------------------------------------------------------------------
   * Material & Specialty Finishes (Matte, 24K Gold Foil, Emboss)
   * ------------------------------------------------------------------------ */
  setFinish(finishKey) {
    this.state.finish = finishKey;
    if (finishKey === 'goldFoil') {
      this.paperMaterial.metalness = 0.82;
      this.paperMaterial.roughness = 0.22;
      this.paperMaterial.color.setHex(0xd4af37); // Rich gold base sheen
    } else if (finishKey === 'emboss') {
      this.paperMaterial.metalness = 0.06;
      this.paperMaterial.roughness = 0.92;
      this.setTone(this.state.tone);
    } else {
      // Standard Matte Ink
      this.paperMaterial.metalness = 0.04;
      this.setTone(this.state.tone);
    }
  }

  setTone(toneKey) {
    if (!this.tones[toneKey]) return;
    this.state.tone = toneKey;
    const t = this.tones[toneKey];
    if (this.state.finish !== 'goldFoil') {
      this.paperMaterial.color.setHex(t.hex);
      this.paperMaterial.roughness = t.roughness;
    }
  }

  setProduct(productType) {
    this.state.product = productType;
    this.cupGroup.visible = productType === 'cup';
    this.bagGroup.visible = productType === 'bag';
    this.tissueGroup.visible = productType === 'tissue';
    this.clamshellGroup.visible = productType === 'box';

    const labelEl = document.getElementById('active-product-label');
    const accContainer = document.getElementById('accessories-container');
    const sizeContainer = document.getElementById('size-options-container');

    if (productType === 'cup') {
      if (labelEl) labelEl.textContent = `Double-Wall Kraft Coffee Cup (${this.state.size})`;
      if (accContainer) accContainer.style.display = 'block';
      if (sizeContainer) {
        sizeContainer.innerHTML = `
          <button class="size-btn ${this.state.size === '8oz' ? 'active' : ''}" data-size="8oz">8 oz (240ml)</button>
          <button class="size-btn ${this.state.size === '12oz' ? 'active' : ''}" data-size="12oz">12 oz (350ml)</button>
          <button class="size-btn ${this.state.size === '16oz' ? 'active' : ''}" data-size="16oz">16 oz (480ml)</button>
        `;
      }
    } else if (productType === 'bag') {
      if (labelEl) labelEl.textContent = `Twisted-Handle Kraft Shopping Bag (${this.state.size})`;
      if (accContainer) accContainer.style.display = 'none';
      if (sizeContainer) {
        sizeContainer.innerHTML = `
          <button class="size-btn ${this.state.size === 'Small' ? 'active' : ''}" data-size="Small">Small (8x10")</button>
          <button class="size-btn ${this.state.size === 'Medium' || this.state.size === '12oz' ? 'active' : ''}" data-size="Medium">Medium (10x14")</button>
          <button class="size-btn ${this.state.size === 'Large' ? 'active' : ''}" data-size="Large">Large (14x18")</button>
        `;
      }
    } else if (productType === 'tissue') {
      if (labelEl) labelEl.textContent = 'Facial Tissue Dispenser Box (Cube)';
      if (accContainer) accContainer.style.display = 'none';
      if (sizeContainer) {
        sizeContainer.innerHTML = `
          <button class="size-btn active" data-size="Cube Box">Cube Box (50 pulls)</button>
          <button class="size-btn" data-size="Flat Box">Flat Box (100 pulls)</button>
        `;
      }
    } else if (productType === 'box') {
      if (labelEl) labelEl.textContent = 'Bio-Clamshell Meal / Burger Box';
      if (accContainer) accContainer.style.display = 'none';
      if (sizeContainer) {
        sizeContainer.innerHTML = `
          <button class="size-btn active" data-size="Standard 6x6">Standard 6x6"</button>
          <button class="size-btn" data-size="Large 9x6">Meal 9x6"</button>
        `;
      }
    }

    this.bindSizeButtons();
    this.updatePricingCalculations();
  }

  setCameraPreset(preset) {
    if (preset === 'front') {
      this.cameraTargetPos.set(0, 0.6, 7.5);
    } else if (preset === 'iso') {
      this.cameraTargetPos.set(4.5, 3.2, 5.8);
    } else if (preset === 'top') {
      this.cameraTargetPos.set(0, 7.8, 1.2);
    } else if (preset === 'close') {
      this.cameraTargetPos.set(0, 0.2, 4.2);
    }
  }

  /* --------------------------------------------------------------------------
   * Dynamic Volume Tier Pricing Calculator (INR ₹)
   * ------------------------------------------------------------------------ */
  updatePricingCalculations() {
    const base = this.basePrices[this.state.product] || 4.50;
    const units = this.state.volumeUnits;

    // Tier discount
    let discount = 0;
    if (units >= 5000) discount = 0.25;
    else if (units >= 2500) discount = 0.18;
    else if (units >= 1000) discount = 0.10;

    const unitPrice = base * (1 - discount);
    this.state.unitPrice = unitPrice;
    const batchTotal = unitPrice * units;

    const unitEl = document.getElementById('custom-unit-price');
    const totalEl = document.getElementById('custom-batch-total');
    const volDisplay = document.getElementById('volume-val-display');
    const discountBadge = document.getElementById('discount-badge');

    if (unitEl) unitEl.textContent = `₹${unitPrice.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${batchTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (volDisplay) volDisplay.textContent = `${units.toLocaleString()} units (${Math.round(units / 500 * 10) / 10} Cartons)`;

    if (discountBadge) {
      if (discount > 0) {
        discountBadge.textContent = `${Math.round(discount * 100)}% WHOLESALE DISCOUNT APPLIED!`;
        discountBadge.style.color = '#10b981';
      } else {
        discountBadge.textContent = '10% OFF at 1,000+ units';
        discountBadge.style.color = '#2C4A3E';
      }
    }
  }

  /* --------------------------------------------------------------------------
   * Save High-Resolution 3D Mockup
   * ------------------------------------------------------------------------ */
  saveMockupImage() {
    this.renderer.render(this.scene, this.camera);
    const dataURL = this.canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `papercraft-${this.state.product}-mockup.png`;
    link.href = dataURL;
    link.click();
  }

  /* --------------------------------------------------------------------------
   * Event Handlers
   * ------------------------------------------------------------------------ */
  bindEvents() {
    window.addEventListener('resize', () => {
      if (!this.canvas) return;
      this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    });

    this.canvas.addEventListener('pointerdown', (e) => {
      this.state.isDragging = true;
      this.pointer.prevX = e.clientX;
      this.pointer.prevY = e.clientY;
    });

    window.addEventListener('pointerup', () => {
      this.state.isDragging = false;
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (this.state.isDragging) {
        const deltaX = e.clientX - this.pointer.prevX;
        const deltaY = e.clientY - this.pointer.prevY;
        this.modelGroup.rotation.y += deltaX * 0.008;
        this.modelGroup.rotation.x += deltaY * 0.008;
        this.pointer.prevX = e.clientX;
        this.pointer.prevY = e.clientY;
      }
    });

    // Toggle Explode View
    const explodeBtn = document.getElementById('btn-toggle-explode');
    const explodeText = document.getElementById('explode-text');
    if (explodeBtn) {
      explodeBtn.addEventListener('click', () => {
        this.state.isExploded = !this.state.isExploded;
        explodeBtn.classList.toggle('active', this.state.isExploded);
        if (explodeText) {
          explodeText.textContent = this.state.isExploded ? 'Assemble Layers' : 'Explode View';
        }
      });
    }

    // Toggle Auto Rotate
    const autoSpinBtn = document.getElementById('btn-toggle-spin');
    if (autoSpinBtn) {
      autoSpinBtn.addEventListener('click', () => {
        this.state.autoRotate = !this.state.autoRotate;
        autoSpinBtn.classList.toggle('active', this.state.autoRotate);
      });
    }

    // Save Mockup
    const saveMockupBtn = document.getElementById('btn-save-mockup');
    if (saveMockupBtn) {
      saveMockupBtn.addEventListener('click', () => this.saveMockupImage());
    }

    // Camera Presets
    const camBtns = document.querySelectorAll('.cam-preset-btn[data-cam]');
    camBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        camBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const preset = e.currentTarget.getAttribute('data-cam');
        this.setCameraPreset(preset);
      });
    });

    // Reset Camera
    const resetBtn = document.getElementById('btn-reset-view');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.modelGroup.rotation.set(0, 0, 0);
        this.setCameraPreset('front');
        camBtns.forEach((b) => b.classList.toggle('active', b.getAttribute('data-cam') === 'front'));
      });
    }

    // Product Silhouettes
    const productPills = document.querySelectorAll('.product-pill');
    productPills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        productPills.forEach((p) => p.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const prod = e.currentTarget.getAttribute('data-product');
        this.setProduct(prod);
      });
    });

    // Paper Swatches
    const swatches = document.querySelectorAll('.paper-swatch');
    swatches.forEach((swatch) => {
      swatch.addEventListener('click', (e) => {
        swatches.forEach((s) => s.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const tone = e.currentTarget.getAttribute('data-tone');
        this.setTone(tone);
      });
    });

    // Finish Effect Buttons (Matte, Gold Foil, Emboss)
    const finishBtns = document.querySelectorAll('.finish-btn');
    finishBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        finishBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const finish = e.currentTarget.getAttribute('data-finish');
        this.setFinish(finish);
      });
    });

    // Brand Text & Tagline Inputs
    const brandInput = document.getElementById('brand-text-input');
    if (brandInput) {
      brandInput.addEventListener('input', (e) => {
        this.state.brandText = e.target.value;
        this.updateBrandTexture();
      });
    }

    const taglineInput = document.getElementById('brand-tagline-input');
    if (taglineInput) {
      taglineInput.addEventListener('input', (e) => {
        this.state.tagline = e.target.value;
        this.updateBrandTexture();
      });
    }

    // Emblem Badge Presets
    const stampBtns = document.querySelectorAll('.stamp-btn');
    stampBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        stampBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.emblem = e.currentTarget.getAttribute('data-emblem');
        this.state.uploadedImage = null; // Reset custom upload when selecting preset
        const labelText = document.getElementById('upload-label-text');
        if (labelText) labelText.textContent = 'Or Upload Custom Logo PNG/JPG';
        this.updateBrandTexture();
      });
    });

    // File Upload: Custom Logo
    const fileInput = document.getElementById('custom-logo-file');
    const uploadLabel = document.getElementById('upload-label-text');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              this.state.uploadedImage = img;
              if (uploadLabel) uploadLabel.textContent = `Uploaded: ${file.name.substring(0, 16)}...`;
              stampBtns.forEach((b) => b.classList.remove('active'));
              this.updateBrandTexture();
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Ink Tone Buttons
    const inkBtns = document.querySelectorAll('.ink-btn');
    inkBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        inkBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.ink = e.currentTarget.getAttribute('data-ink');
        this.updateBrandTexture();
      });
    });

    // Lighting Mood Buttons
    const lightBtns = document.querySelectorAll('.lighting-btn');
    lightBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        lightBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const mood = e.currentTarget.getAttribute('data-light');
        this.setLightingMood(mood);
      });
    });

    // Accessories Toggles
    const checkSleeve = document.getElementById('check-sleeve');
    if (checkSleeve) {
      checkSleeve.addEventListener('change', (e) => {
        this.sleeveMesh.visible = e.target.checked;
      });
    }

    const checkLid = document.getElementById('check-lid');
    if (checkLid) {
      checkLid.addEventListener('change', (e) => {
        this.lidSubGroup.visible = e.target.checked;
      });
    }

    // Volume Slider
    const volSlider = document.getElementById('volume-slider');
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        this.state.volumeUnits = parseInt(e.target.value, 10);
        this.updatePricingCalculations();
      });
    }

    this.bindSizeButtons();

    // Add Custom 3D Batch to Cart (INR)
    const addCustomBtn = document.getElementById('btn-add-custom-cart');
    if (addCustomBtn) {
      addCustomBtn.addEventListener('click', () => {
        const prodNames = {
          cup: 'Bespoke Double-Wall Paper Cup',
          bag: 'Custom Printed Kraft Shopping Bag',
          tissue: 'Custom Eco Tissue Dispenser Box',
          box: 'Custom Bio-Clamshell Meal Box'
        };

        const toneName = this.tones[this.state.tone].name;
        const brandTitle = this.state.brandText || 'Custom Brand';

        this.cart.addItem({
          id: `custom-${this.state.product}-${Date.now()}`,
          name: prodNames[this.state.product],
          specs: `Print: "${brandTitle}" • ${toneName} • ${this.state.size} (${this.state.finish.toUpperCase()})`,
          unitPrice: this.state.unitPrice,
          cartonUnits: this.state.volumeUnits,
          qty: 1,
          thumb:
            this.state.product === 'cup'
              ? 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80'
              : this.state.product === 'bag'
              ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=150&q=80'
              : 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&w=150&q=80'
        });
      });
    }
  }

  bindSizeButtons() {
    const sizeBtns = document.querySelectorAll('.size-btn');
    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        sizeBtns.forEach((b) => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.state.size = e.currentTarget.getAttribute('data-size');
        const labelEl = document.getElementById('active-product-label');
        if (labelEl) {
          labelEl.textContent = `Custom ${this.state.product.toUpperCase()} (${this.state.size})`;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
   * Real-time Animation Loop with Smooth Explode Layer Transitions
   * ------------------------------------------------------------------------ */
  animate() {
    requestAnimationFrame(() => this.animate());

    // Smooth camera position interpolation
    this.camera.position.lerp(this.cameraTargetPos, 0.08);
    this.camera.lookAt(0, 0, 0);

    // Smooth Explode Animation Interpolation
    const targetExplode = this.state.isExploded ? 1.0 : 0.0;
    this.state.explodeProgress += (targetExplode - this.state.explodeProgress) * 0.08;
    const ep = this.state.explodeProgress;

    // 1. Cup Explode: Lid elevates, sleeve slides down, inner lining peeks
    if (this.cupGroup.visible) {
      this.lidSubGroup.position.y = 1.75 + ep * 1.6;
      this.sleeveMesh.position.y = -0.15 - ep * 0.9;
      this.cupInnerMesh.position.y = 0.02 + ep * 0.35;
    }

    // 2. Bag Explode: Handles pull up
    if (this.bagGroup.visible) {
      this.bagHandlesGroup.position.y = ep * 0.75;
    }

    // 3. Tissue Explode: Paper floats up
    if (this.tissueGroup.visible) {
      this.tissuePaperGroup.position.y = ep * 1.35;
    }

    // 4. Clamshell Box Explode: Upper lid hinges open by 55 degrees!
    if (this.clamshellGroup.visible) {
      this.clamshellLidPivot.rotation.x = -ep * 0.95;
    }

    // Gentle Auto-Rotation (when not user-dragging)
    if (this.state.autoRotate && !this.state.isDragging) {
      this.modelGroup.rotation.y += 0.007;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Catalogue Grid & Modal Logic (INR)
function initCatalogueAndModals(cartManager, studio3d) {
  const container = document.getElementById('products-container');
  if (!container) return;

  function renderProducts(category = 'all') {
    const filtered =
      category === 'all'
        ? CATALOGUE_PRODUCTS
        : CATALOGUE_PRODUCTS.filter((p) => p.category === category);

    container.innerHTML = filtered
      .map(
        (p) => `
        <article class="product-card" data-category="${p.category}">
          <div class="product-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="product-img" loading="lazy">
            <span class="product-eco-badge">${p.badge}</span>
          </div>
          <div class="product-card-body">
            <span class="product-category-tag">${p.category}</span>
            <h3 class="product-title">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <div class="product-card-footer">
              <div class="product-pricing">
                <span class="unit-price">₹${p.price.toFixed(2)}</span>
                <span class="pack-size">${p.pack}</span>
              </div>
              <div class="product-btn-group">
                <button class="btn-card-customize" data-model="${p.modelType}" data-tone="${p.tone}" title="Load into 3D Studio">
                  3D View
                </button>
                <button class="btn-card-add" data-id="${p.id}" title="Add Carton to Cart">
                  + Add
                </button>
              </div>
            </div>
          </div>
        </article>
      `
      )
      .join('');

    container.querySelectorAll('.btn-card-customize').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const model = e.currentTarget.getAttribute('data-model');
        const tone = e.currentTarget.getAttribute('data-tone');

        studio3d.setProduct(model);
        studio3d.setTone(tone);

        document.querySelectorAll('.product-pill').forEach((p) => {
          p.classList.toggle('active', p.getAttribute('data-product') === model);
        });
        document.querySelectorAll('.paper-swatch').forEach((s) => {
          s.classList.toggle('active', s.getAttribute('data-tone') === tone);
        });

        const target = document.getElementById('customizer');
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    container.querySelectorAll('.btn-card-add').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-id');
        const item = CATALOGUE_PRODUCTS.find((p) => p.id === prodId);
        if (item) {
          cartManager.addItem({
            id: item.id,
            name: item.name,
            specs: `${item.pack} • Made in India`,
            unitPrice: item.price,
            cartonUnits: item.id.includes('1000') ? 1000 : item.id.includes('250') ? 250 : 500,
            qty: 1,
            thumb: item.image
          });
        }
      });
    });
  }

  renderProducts('all');

  const tabs = document.querySelectorAll('.cat-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      tabs.forEach((t) => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      const cat = e.currentTarget.getAttribute('data-cat');
      renderProducts(cat);
    });
  });

  const openQuoteBtn = document.getElementById('btn-open-quote');
  const quoteModal = document.getElementById('quote-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');
  const quoteForm = document.getElementById('quote-form');

  if (openQuoteBtn && quoteModal) {
    openQuoteBtn.addEventListener('click', () => quoteModal.classList.add('open'));
  }
  if (closeModalBtn && quoteModal) {
    closeModalBtn.addEventListener('click', () => quoteModal.classList.remove('open'));
  }
  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) quoteModal.classList.remove('open');
    });
  }
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Dhanyavaad! Your bespoke packaging inquiry has been received. Our India packaging team will review your specifications and send a formal wholesale quote in INR within 4 business hours.');
      quoteModal.classList.remove('open');
      quoteForm.reset();
    });
  }
}

// App Initialization
window.addEventListener('DOMContentLoaded', () => {
  const cartManager = new CartManager();
  const studio3d = new PaperCraft3DStudio(cartManager);
  initCatalogueAndModals(cartManager, studio3d);
});
