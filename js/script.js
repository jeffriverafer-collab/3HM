const menuToggle=document.querySelector(".menu-toggle");
const menu=document.querySelector(".menu");
const openSearch=document.getElementById("openSearch");
const closeSearch=document.getElementById("closeSearch");
const searchModal=document.getElementById("searchModal");
const searchInput=document.getElementById("searchInput");
const searchGo=document.getElementById("searchGo");
const searchResult=document.getElementById("searchResult");

menuToggle?.addEventListener("click",()=>menu.classList.toggle("active"));
document.querySelectorAll(".menu a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("active")));

openSearch?.addEventListener("click",()=>{
  searchModal.classList.add("open");
  setTimeout(()=>searchInput.focus(),100);
});
closeSearch?.addEventListener("click",()=>searchModal.classList.remove("open"));
searchModal?.addEventListener("click",e=>{if(e.target===searchModal)searchModal.classList.remove("open")});
document.addEventListener("keydown",e=>{if(e.key==="Escape")searchModal.classList.remove("open")});

function doSearch(){
  const q=searchInput.value.trim();
  if(!q){searchResult.textContent="Escribe algo para realizar la búsqueda.";return;}
  const terms=["madera","pegamento","pared","metal","hogar","pintura","cocina","dormitorio","exterior","interior"];
  const found=terms.filter(t=>q.toLowerCase().includes(t));
  searchResult.textContent=found.length
    ? `Búsqueda preparada para: ${q}.`
    : `No hay resultados locales para “${q}”. Puedes ampliar la búsqueda.`;
}
searchGo?.addEventListener("click",doSearch);
searchInput?.addEventListener("keydown",e=>{if(e.key==="Enter")doSearch()});

const WHATSAPP_NUMBER="51951829074";
const productModal=document.getElementById("productModal");
const productModalBox=document.getElementById("productModalBox");
if(productModal&&productModalBox&&typeof PRODUCTS_DATA!=="undefined"){
  let activeImage=0;
  let activeSize=0;
  let currentProduct=null;

  const WHATSAPP_ICON='<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.9L2 22l5.2-1.2a8.9 8.9 0 0 0 4.3 1.1h0a9 9 0 0 0 6.1-15.6zm-6.1 13.8a7.4 7.4 0 0 1-3.8-1l-.3-.2-3.1.7.7-3-.2-.3a7.4 7.4 0 1 1 6.7 3.8zm4.1-5.5c-.2-.1-1.3-.7-1.5-.7s-.4-.1-.5.1-.6.7-.7.9-.3.2-.5.1a6 6 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4c-.1-.1-.5-1.3-.7-1.7s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1.1 2.7 11.3 11.3 0 0 0 4.4 3.9c.6.3 1.1.4 1.5.6a3.5 3.5 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.2 2.1 2.1 0 0 0 .1-1.2c0-.2-.2-.2-.4-.3z"/></svg>';

  function buildWhatsAppUrl(product,specLabel,specValue){
    const lines=[
      "Hola, quiero cotizar el siguiente producto:",
      "",
      `Producto: ${product.name}`,
      `Categoría: ${product.category}`,
      `${specLabel}: ${specValue}`,
      "",
      "¿Podrían brindarme más información y precio?"
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  }

  function renderColorProduct(product){
    const variant=product.variants[activeImage];
    const hasMultiple=product.variants.length>1;
    const media=`
      <div class="modal-product-media">
        ${hasMultiple?'<button class="modal-carousel-nav modal-carousel-prev" data-carousel-prev aria-label="Color anterior">‹</button>':""}
        <img src="${variant.img}" alt="${product.name} - ${variant.label}">
        ${hasMultiple?'<button class="modal-carousel-nav modal-carousel-next" data-carousel-next aria-label="Color siguiente">›</button>':""}
      </div>`;
    const swatches=product.variants.map((v,i)=>
      `<button type="button" class="modal-variant-swatch${i===activeImage?" active":""}" data-image-index="${i}" style="background:${v.color}" aria-label="${v.label}" title="${v.label}"></button>`
    ).join("");
    productModalBox.innerHTML=`
      <button class="modal-close" data-modal-close aria-label="Cerrar">&times;</button>
      <div class="modal-product">
        ${media}
        <div class="modal-product-body">
          <p class="eyebrow">${product.category}</p>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <h4>Elige el color</h4>
          <div class="modal-variants">${swatches}</div>
          <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${buildWhatsAppUrl(product,"Color",variant.label)}" data-whatsapp-btn>${WHATSAPP_ICON} Cotizar por WhatsApp</a>
        </div>
      </div>`;
  }

  function renderStandardProduct(product){
    const images=product.images;
    const hasMultipleImages=images.length>1;
    const media=`
      <div class="modal-product-media">
        ${hasMultipleImages?'<button class="modal-carousel-nav modal-carousel-prev" data-carousel-prev aria-label="Foto anterior">‹</button>':""}
        <img src="${images[activeImage]}" alt="${product.name}">
        ${hasMultipleImages?'<button class="modal-carousel-nav modal-carousel-next" data-carousel-next aria-label="Foto siguiente">›</button>':""}
      </div>`;
    const sizePills=product.sizes.map((s,i)=>
      `<button type="button" class="modal-variant-pill${i===activeSize?" active":""}" data-size-index="${i}">${s}</button>`
    ).join("");
    productModalBox.innerHTML=`
      <button class="modal-close" data-modal-close aria-label="Cerrar">&times;</button>
      <div class="modal-product">
        ${media}
        <div class="modal-product-body">
          <p class="eyebrow">${product.category}</p>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          ${product.sizes.length?`<h4>Elige los litros / presentación</h4><div class="modal-variants">${sizePills}</div>`:""}
          <a class="btn btn-whatsapp" target="_blank" rel="noopener" href="${buildWhatsAppUrl(product,"Presentación",product.sizes[activeSize]||"—")}" data-whatsapp-btn>${WHATSAPP_ICON} Cotizar por WhatsApp</a>
        </div>
      </div>`;
  }

  function renderModal(product){
    if(product.isColorVariant)renderColorProduct(product);
    else renderStandardProduct(product);
  }

  function openProductModal(slug){
    const product=PRODUCTS_DATA[slug];
    currentProduct=product||null;
    if(!product){
      productModalBox.innerHTML="<button class=\"modal-close\" data-modal-close aria-label=\"Cerrar\">&times;</button><p style=\"padding:40px\">No se pudo cargar la información del producto.</p>";
    }else{
      activeImage=0;
      activeSize=0;
      renderModal(product);
    }
    productModal.classList.add("open");
    document.body.style.overflow="hidden";
  }
  function closeProductModal(){
    productModal.classList.remove("open");
    document.body.style.overflow="";
  }
  document.querySelectorAll("[data-product-modal]").forEach(btn=>{
    btn.addEventListener("click",e=>{
      e.preventDefault();
      openProductModal(btn.getAttribute("data-product-modal"));
    });
  });
  productModalBox.addEventListener("click",e=>{
    if(e.target.closest("[data-modal-close]")){closeProductModal();return;}
    if(!currentProduct)return;
    const imageCount=currentProduct.isColorVariant?currentProduct.variants.length:currentProduct.images.length;
    const sizePill=e.target.closest("[data-size-index]");
    const imagePill=e.target.closest("[data-image-index]");
    const prevBtn=e.target.closest("[data-carousel-prev]");
    const nextBtn=e.target.closest("[data-carousel-next]");
    if(sizePill)activeSize=Number(sizePill.getAttribute("data-size-index"));
    else if(imagePill)activeImage=Number(imagePill.getAttribute("data-image-index"));
    else if(prevBtn)activeImage=(activeImage-1+imageCount)%imageCount;
    else if(nextBtn)activeImage=(activeImage+1)%imageCount;
    else return;
    renderModal(currentProduct);
  });
  productModal.addEventListener("click",e=>{
    if(e.target===productModal)closeProductModal();
  });
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape")closeProductModal();
  });
}

const heroTrack=document.getElementById("heroTrack");
if(heroTrack){
  const slides=heroTrack.children;
  const total=slides.length;
  const dots=document.querySelectorAll("#heroDots .hero-dot");
  const prevBtn=document.getElementById("heroPrev");
  const nextBtn=document.getElementById("heroNext");
  let current=0, timer;

  function goTo(index){
    current=(index+total)%total;
    heroTrack.style.transform=`translateX(-${current*(100/total)}%)`;
    dots.forEach((d,i)=>d.classList.toggle("active",i===current));
  }
  function nextSlide(){goTo(current+1)}
  function prevSlide(){goTo(current-1)}
  function startAuto(){timer=setInterval(nextSlide,6000)}
  function resetAuto(){clearInterval(timer);startAuto()}

  nextBtn?.addEventListener("click",()=>{nextSlide();resetAuto()});
  prevBtn?.addEventListener("click",()=>{prevSlide();resetAuto()});
  dots.forEach((d,i)=>d.addEventListener("click",()=>{goTo(i);resetAuto()}));

  startAuto();
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.style.opacity="1";
      entry.target.style.transform="translateY(0)";
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".category-card,.solution-copy,.about-copy,.product-card,.solution-item,.value-card").forEach(el=>{
  el.style.opacity="0";
  el.style.transform="translateY(25px)";
  el.style.transition="opacity .7s ease, transform .7s ease";
  observer.observe(el);
});
