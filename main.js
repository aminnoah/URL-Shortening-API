const menuNav = document.querySelector('.header__nav');
const btnShort = document.querySelector('.btn-short');
const error = document.querySelector('.error');
const urlInput = document.getElementById('url-input');


const originalLink = document.querySelector('.old-url');
const shortenContent = document.querySelector('.shorten-content');

// If display is mobile size, use menu bars for nav
function menuMobile() {
  menuBars.addEventListener('click', function (e) {
    e.preventDefault();
    menuNav.classList.toggle('nav-mobile');
  });
}

function shortLink() {
  btnShort.addEventListener('click', function (e) {
    // if no value is placed return initial error
    if (urlInput.value == '') {
      error.style.visibility = 'initial';
    } else if (urlInput.value !== '') {
      // if value, hide error, send get request to url shortner
      error.style.visibility = 'hidden';
      const url = `https://api.shrtco.de/v2/shorten?url=${input.value}`;
      fetch(url)
        .then((response) => response.json())
        .then((link) => {
          // create new element for url list
          const urls = document.createElement('div');
          urls.classList.add('urls');
          shortenContent.appendChild(urls);
          const short_url = link.result.short_link;
          urls.innerHTML = `
          <p class="old-url">${urlInput.value}</p>
          <div class="box-urls">
            <p class="short-url">${short_url}</p>
            <button class="btn-copy" value="${short_url}">Copy</button>
          </div>
          `;
          // copy button to copy to clipboard
          let btn_copy = document.querySelectorAll('.btn-copy');
          btn_copy.forEach((btn) => {
            btn.addEventListener('click', async function copy() {
              const short_url = btn.value;
              await navigator.clipboard.writeText(short_url);
            });
          });
          localStorage.setItem(Math.floor(Math.random() * 100), urls.innerHTML);
        });
    }
  });
  for (var i = 0; i < localStorage.length; i++) {
    let saved = localStorage.getItem(localStorage.key(i));
    if (saved) {
      const urls = document.createElement('div');
      urls.classList.add('urls');
      urls.innerHTML = saved;
      shortenContent.appendChild(urls);
    }
  }
}


menuMobile();
shortLink();