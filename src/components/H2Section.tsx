import { createSignal } from "solid-js";

export default function H2Section(props: {
  heading: HTMLElement;
  children: HTMLElement;
}) {
  const [open, setOpen] = createSignal(false);
  function toggleCollapse(e: any) {
    const head = e.currentTarget;
    const content = head.nextElementSibling;

    setOpen(!open());
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      if (content) {
        const sticky_header_height = head.offsetHeight;
        const content_top = content.getBoundingClientRect().top;
        if (content_top > 0) {
          return;
        }
        const top_of_head = content_top + window.scrollY;
        window.scrollTo({
          top: top_of_head - sticky_header_height,
          behavior: "instant",
        });
      }
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }

  return (
    // <div class="mx-auto mt-[120px] w-[62%] max-w-[750px] px-10 ">
    <>
      <section>
        <button class="h2-section" onClick={toggleCollapse}>
          {props.heading}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="size-6"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
              clip-rule="evenodd"
            />
          </svg>
          <hr />
        </button>
        <div
          class={
            open()
              ? "transition-[opacity] duration-200 opacity-100 ease-in"
              : "transition-[opacity] relative max-h-0 opacity-0 ease-out overflow-hidden duration-200"
          }
        >
          {props.children}
        </div>
      </section>
    </>
  );
}
