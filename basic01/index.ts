const selectPlanButtons = document.querySelectorAll(
  ".plan button"
) as NodeListOf<HTMLButtonElement>;
const backdrop = document.querySelector(".backdrop")! as HTMLDivElement;
const modal = document.querySelector(".modal")! as HTMLDivElement;
const modalButton = (
  document.getElementsByClassName(
    "modal__action"
  ) as HTMLCollectionOf<HTMLAnchorElement>
).item(0)!;
const modalButtonNegative = (
  document.getElementsByClassName(
    "modal__action--negative"
  ) as HTMLCollectionOf<HTMLButtonElement>
).item(0)!;

const mobileNavButton = document.querySelector(
  ".toggle-button"
)! as HTMLButtonElement;

const mobileNav = document.querySelector(".mobile-nav") as HTMLElement;

selectPlanButtons.forEach((selectPlanButton) => {
  selectPlanButton.addEventListener("click", () => {
    // 인라인 스타일이 기존 css를 덮어씌운다.
    modal.style.display = "block";
    backdrop.style.display = "block";
  });
});

function closeModal() {
  modal.style.display = "none";
  backdrop.style.display = "none";
}

backdrop.addEventListener("click", () => {
  mobileNav.style.display = "none";
  closeModal();
});

modalButtonNegative.addEventListener("click", closeModal);

mobileNavButton.addEventListener("click", () => {
  mobileNav.style.display = "block";
  backdrop.style.display = "block";
});
