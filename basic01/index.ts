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

selectPlanButtons.forEach((selectPlanButton) => {
  selectPlanButton.addEventListener("click", () => {
    // 인라인 스타일이 기존 css를 덮어씌운다.
    modal.style.display = "block";
    backdrop.style.display = "block";
  });
});

function modalClose() {
  modal.style.display = "none";
  backdrop.style.display = "none";
}

backdrop.addEventListener("click", modalClose);
modalButtonNegative.addEventListener("click", modalClose);
