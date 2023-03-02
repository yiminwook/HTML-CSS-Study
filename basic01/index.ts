const selectPlanButtons = document.querySelectorAll(
  ".plan button"
) as NodeListOf<HTMLButtonElement>;
const backdrop = document.querySelector(".backdrop") as HTMLDivElement;
const modal = document.querySelector(".modal") as HTMLDivElement;
const modalButton = (
  document.getElementsByClassName(
    "modal__action"
  ) as HTMLCollectionOf<HTMLAnchorElement>
).item(0);
const modalButtonNegative = (
  document.getElementsByClassName(
    "modal__action--negative"
  ) as HTMLCollectionOf<HTMLButtonElement>
).item(0);

const mobileNavButton = document.querySelector(
  ".toggle-button"
) as HTMLButtonElement;

const mobileNav = document.querySelector(".mobile-nav") as HTMLElement;
const ctaButton = document.querySelector(
  ".main-nav__item--cta"
) as HTMLOListElement;

selectPlanButtons.forEach((selectPlanButton) => {
  selectPlanButton.addEventListener("click", () => {
    // 인라인 스타일이 기존 css를 덮어씌운다.
    if (modal) {
      modal.style.display = "block";
      //순차적으로 css를 적용시킨다.
      setTimeout(() => modal.classList.add("open"), 10);
    }
    if (backdrop) {
      backdrop.style.display = "block";
      setTimeout(() => backdrop.classList.add("open"), 10);
    }
  });
});

function closeModal() {
  if (modal) {
    modal.classList.remove("open");
    // display=none이 transtion이 작동후에 적용될 수 있도록 한다.
    setTimeout(() => (modal.style.display = "none"), 500);
  }
  if (backdrop) {
    backdrop.classList.remove("open");
    setTimeout(() => (backdrop.style.display = "none"), 500);
  }
}

if (backdrop) {
  backdrop.addEventListener("click", () => {
    if (mobileNav) {
      mobileNav.classList.remove("open");
      setTimeout(() => (mobileNav.style.display = "none"), 500);
    }
    closeModal();
  });
}

if (modalButtonNegative) {
  modalButtonNegative.addEventListener("click", closeModal);
}

if (mobileNavButton) {
  mobileNavButton.addEventListener("click", () => {
    if (mobileNav) {
      mobileNav.style.display = "block";
      setTimeout(() => mobileNav.classList.add("open"), 10);
    }
    if (backdrop) {
      backdrop.style.display = "block";
      setTimeout(() => backdrop.classList.add("open"), 10);
    }
  });
}

const form = document.querySelector(".signup-form") as HTMLFormElement;
if (form) {
  form.addEventListener("click", (e) => {});
}

if (ctaButton) {
  ctaButton.addEventListener("animationstart", (e) => {
    // console.log(e);
    // console.log("start");
  });
  ctaButton.addEventListener("animationend", (e) => {
    // console.log(e);
    // console.log("end");
  });
  ctaButton.addEventListener("animationiteration", (e) => {
    // console.log(e);
    // console.log("literation");
  });
}
