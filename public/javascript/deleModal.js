const modalContent = document.querySelector(".modal-content");
const deleBTNs = document.querySelectorAll(".deleBTN");
deleBTNs.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const deleBTN = e.target.contains(btn) ? e.target : e.target.parentElement;
    const { id, name } = deleBTN.dataset;
    modalContent.innerHTML = `<div class="modal-header">
                <h1 class="modal-title fs-5" id="deleModalLabel">確認將 ${name} 刪除?</h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >Close</button>
                <form
                  action="/restaurants/${id}?_method=DELETE"
                  method="post"
                  style="display: inline;"
                >
                  <button type="submit" class="btn btn-danger">刪除</button>
                </form>
              </div>`;
  });
});
