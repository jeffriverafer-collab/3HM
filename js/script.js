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
