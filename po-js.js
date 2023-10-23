  // 다크모드 토글 스위치 로직 및 삽입
  // 스위치 생성 및 초기 설정을 담당하는 함수
  function createDarkModeSwitch() {
    var switchLabel = document.createElement("label");
    switchLabel.className = "switch theme-switch";

    var switchInput = document.createElement("input");
    switchInput.type = "checkbox";
    switchInput.id = "darkModeToggle";

    var switchSpan = document.createElement("span");
    switchSpan.className = "slider round";

    switchLabel.appendChild(switchInput);
    switchLabel.appendChild(switchSpan);

    var newDiv = document.createElement("div");
    newDiv.appendChild(switchLabel);

    return newDiv; // 생성된 스위치 요소 반환
}

// 다크 모드 토글 및 로고 업데이트 함수
function updateThemeAndLogo(isDarkMode) {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    var logoImage = document.querySelector("a.logo > img");
    if (logoImage) {
        logoImage.src = isDarkMode ? "https://d2mftr5bxogqxd.cloudfront.net/bae657d8cf4f4f7aa3d37bbce7deb52c.webp" : "https://d2mftr5bxogqxd.cloudfront.net/2da64bb9252847288437a833993168e9.webp";
    }
}

// 스위치의 상태를 설정하고 이벤트 리스너를 추가하는 함수
function setupDarkModeSwitch(switchElement) {
    var switchInput = switchElement.querySelector("#darkModeToggle");

    let storedTheme = localStorage.getItem('theme') || 'light'; // 기본값을 'light'로 설정
    const isDarkMode = storedTheme === 'dark';
    updateThemeAndLogo(isDarkMode);
    switchInput.checked = isDarkMode;

    switchInput.addEventListener('change', (e) => {
        const selectedTheme = e.target.checked;
        updateThemeAndLogo(selectedTheme);
        localStorage.setItem('theme', selectedTheme ? 'dark' : 'light');
    });
}
function createScrollTopButton() {
  // 새로운 버튼 요소 생성
  var button = document.createElement('button');

  // 버튼에 ID 설정
  button.id = 'scrollTopBtn';

  // 버튼 내부 텍스트 설정
  button.innerHTML = "^";

  // 버튼에 타이틀 속성 추가
  button.setAttribute('title', 'Go to top');

  // 버튼의 초기 표시 스타일을 'none'으로 설정
  button.style.display = "none";

  // 클릭 이벤트 리스너 추가
  button.addEventListener('click', function(){
      window.scrollTo({top: 0, behavior: 'smooth'});
  });

  // 생성한 버튼을 body의 자식 요소로 추가
  document.body.appendChild(button);
}

function handleScrollEvent() {
  // 스크롤 이벤트에 대한 리스너 설정
  window.onscroll = function() {
      scrollFunction();
  };
}

function scrollFunction() {
  // 스크롤이 20px을 초과하면 버튼 표시
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("scrollTopBtn").style.display = "block";
  } else {
      document.getElementById("scrollTopBtn").style.display = "none";
  }
}
function setupMobileNavigation() {
  var activePanel = null;

  // 네비게이션 바 컨테이너 생성
  var navBar = document.createElement("div");
  navBar.className = "mobile-nav";

  // 각 네비게이션 아이템 생성
  var navItems = ["메뉴","내 정보","스포츠 중계", "채팅창", "^"];

  navItems.forEach(function(item) {
      var navItem = document.createElement("div");
      navItem.className = "nav-item";
      var link = document.createElement("a");
      link.href = "javascript:void(0)";
      link.textContent = item;
      navItem.appendChild(link);

      navBar.appendChild(navItem);

      navItem.addEventListener("click", function() {
          // '상단으로' 버튼을 누르면 현재 열린 패널을 닫고 페이지 상단으로 스크롤합니다.
          if (item === "^") {
              if (activePanel) {
                  activePanel.classList.remove("active");
                  activePanel = null;
              }
              window.scrollTo({top: 0, behavior: 'smooth'});
              return;
          }

          var currentPanel = getPanelForNavItem(item);

          // 다른 패널이 열려 있으면 현재 상태를 초기화합니다.
          if (activePanel && activePanel !== currentPanel) {
              activePanel.classList.remove("active");
              activePanel = null;
          }

          // 현재 패널이 열려있는지 확인하고 상태를 변경합니다.
          if (currentPanel) {
              currentPanel.classList.toggle("active");
              activePanel = currentPanel.classList.contains("active") ? currentPanel : null;
          }
      });
  });

  document.body.appendChild(navBar);

  document.addEventListener('click', function(event) {
      // 클릭된 요소가 패널 내부에 있는지, 또는 네비게이션 아이템 중 하나인지 확인합니다.
      var insidePanel = activePanel && activePanel.contains(event.target);
      var insideNavItem = navBar.contains(event.target);

      // 클릭된 요소가 패널이나 네비게이션 아이템 외부에 있는 경우, 패널을 닫습니다.
      if (activePanel && !insidePanel && !insideNavItem) {
          activePanel.classList.remove("active");
          activePanel = null;
      }
  });
}

function getPanelForNavItem(item) {
  switch (item) {
      case "내 정보":
          var userInfoPanel = document.querySelector("aside .userInfo");
          if (!userInfoPanel) {
              window.location.href = "https://psdtv1.com/login";
          }
          return userInfoPanel;
      case "메뉴":
          return document.querySelector("header #nav");
      case "스포츠 중계":
          window.location.href = "https://psdtv1.com/pages/live";
          return null; // 이 경우에는 특정 패널을 반환하지 않습니다.
      case "채팅창":
          return document.querySelector("#chatApp");
      default:
          return null;
  }
}

function initializeChatAppResize() {
  function createResizeHandler() {
      var chatApp = document.querySelector('#chatApp');
      var container = document.querySelector('#chatApp .container');
      var chatAppMessages = document.querySelector('.chatAppMessages'); // .chatAppMessages 요소 선택
      var resizeHandle = document.createElement('div');
      resizeHandle.className = 'resize-handle';
      container.insertBefore(resizeHandle, container.firstChild);

      function startResize(e) {
          e.preventDefault();
          var startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
          var startHeight = chatApp.offsetHeight;

          function doDrag(e) {
              var currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
              var newHeight = startHeight - (currentY - startY);

              // 채팅창의 높이가 700px을 초과하지 않도록 조정
              if (newHeight > 700) {
                  newHeight = 700;
              }

              chatApp.style.height = newHeight + 'px';
              container.style.height = newHeight + 'px';
              chatAppMessages.style.height = (newHeight - resizeHandle.offsetHeight) + 'px'; // .chatAppMessages의 높이 조정
          }

          function stopDrag() {
              document.documentElement.removeEventListener('mousemove', doDrag, false);
              document.documentElement.removeEventListener('mouseup', stopDrag, false);
              document.documentElement.removeEventListener('touchmove', doDrag, false);
              document.documentElement.removeEventListener('touchend', stopDrag, false);
          }

          document.documentElement.addEventListener('mousemove', doDrag, false);
          document.documentElement.addEventListener('mouseup', stopDrag, false);
          document.documentElement.addEventListener('touchmove', doDrag, false);
          document.documentElement.addEventListener('touchend', stopDrag, false);
      }

      resizeHandle.addEventListener('mousedown', startResize, false);
      resizeHandle.addEventListener('touchstart', startResize, false);
  }

  // 화면 너비에 따라 리사이즈 핸들러 생성 조건
  if (window.innerWidth <= 1250) {
      createResizeHandler();
  }

  window.addEventListener('resize', function() {
      var resizeHandle = document.querySelector(".resize-handle");
      if (window.innerWidth <= 1250 && !resizeHandle) {
          createResizeHandler();
      } else if (window.innerWidth > 1250 && resizeHandle) {
          resizeHandle.remove();
      }
  });
}

function initializeCustomNavigation() {
  var navWrap = document.querySelector('.navWrap');

  if (navWrap) {
      var newElement = document.createElement('div');
      newElement.id = 'lnavmenu';
      newElement.innerHTML = `
      <div class="uinfo">
        <div class="left-section">
            <div class="info-container">
                <div class="name-level-container">
                </div>
                <div class="btn-c">
                </div>
            </div>
<div style="font-size: 11px;">다음 레벨까지 필요한 경험치(포인트)</div>
            <div class="expbar">
            </div>
        </div>
<div class="line"></div>
        <div class="pinfo">
        </div>
    </div>
            <div id="quickmenu">
                <ul>
                    <li><a href="/pages/live"><img src="https://d2mftr5bxogqxd.cloudfront.net/2df208365bf04727a5186e44a5e83d3c.webp"></a></li>
                    <li><a href="/checkIn"><img src="https://d2mftr5bxogqxd.cloudfront.net/d75a25ede5f34c3e962bf8dd7d3abe83.webp"></a></li>
                    <li><a href="/user/myPoints"><img src="https://d2mftr5bxogqxd.cloudfront.net/1c38f5a0482745deba51b9003ae166fc.webp"></a></li>
                    <li><a href="/user/ranking"><img src="https://d2mftr5bxogqxd.cloudfront.net/7840dfe9c82d4106b64865727cc887ab.webp"></a></li>
                </ul>
                <ul>
                    <li><a href="/user/myInfo"><img src="https://d2mftr5bxogqxd.cloudfront.net/9c29706394d3482ca125babb52d88dbb.webp"></a></li>
                    <li><a href="/user/myPosts"><img src="https://d2mftr5bxogqxd.cloudfront.net/96a31cff958648c1a07b7a4c43923a98.webp"></a></li>
                    <li><a href="/noteReceived"><img src="https://d2mftr5bxogqxd.cloudfront.net/3d5ed50ab0f445d6bfeb1a76d8645ec6.webp"></a></li>
                    <li><a href="/logout"><img src="https://d2mftr5bxogqxd.cloudfront.net/e96bfa728db54bf4a65f1cf0ca24d173.webp"></a></li>
                </ul>
            </div>`;
      
      navWrap.insertBefore(newElement, navWrap.children[1]);
  } else {
      console.error("'navWrap' 요소를 찾을 수 없습니다.");
  }

  var badge = document.querySelector('#gradeBadge');
  var nick = document.querySelector('#nickName > div:nth-child(2)');
  var level = document.querySelector(".userInfo > div > div:nth-child(1) > div:nth-child(1) > span");
  var points = document.querySelector(".userInfo > div > div:nth-child(1) > div.flex.flex-col > a:nth-child(1)");
  var acpoints = document.querySelector(".userInfo > div > div:nth-child(1) > div.flex.flex-col > a:nth-child(2)");
  var infoco = document.querySelector('.info-container');
  var pinfo = document.querySelector('.pinfo');
  var ulc = document.querySelector('.name-level-container');
  var expbar = document.querySelector('.expbar');

    var parentDiv = document.querySelector('div[style*="flex-direction: column;"]');
    var exp = parentDiv ? parentDiv.children[1] : null;
        var mypageElement = document.querySelector('.mypage');
  // 요소들이 존재하는지 확인
  if (badge && nick && level && points && acpoints && exp && infoco && ulc && pinfo && expbar) {
      // 요소 복제
      var clonedbadge = badge.cloneNode(true);
      var clonednick = nick.cloneNode(true);
      var clonedlevel = level.cloneNode(true);
      var clonedpoints = points.cloneNode(true);
      var clonedacpoints = acpoints.cloneNode(true);
      var clonedexp = exp.cloneNode(true);

      // 새로운 클래스 추가
      clonednick.classList.add("newnick");
      clonedlevel.classList.add("newlevel");
      clonedpoints.classList.add("newpoints");
      clonedacpoints.classList.add("newacpoints");
      clonedexp.classList.add("exp")

      // 요소 삽입
      infoco.insertBefore(clonedbadge, infoco.firstChild);
      ulc.insertBefore(clonednick, ulc.firstChild);
      ulc.insertBefore(clonedlevel, clonednick.nextSibling);
      expbar.insertBefore(clonedexp, expbar.firstChild);
      pinfo.insertBefore(clonedpoints, pinfo.firstChild);
      pinfo.insertBefore(clonedacpoints, clonedpoints.nextSibling);
        if (mypageElement) {
            mypageElement.classList.add('nov');
        }
  } else {
              var uinfoElement = document.querySelector('.uinfo');


        if (uinfoElement) {
            uinfoElement.classList.add('nov');
        }

        if (mypageElement) {
            mypageElement.classList.add('yesv');
        }
  }
}

// DOM이 완전히 로드된 후 실행
document.addEventListener('DOMContentLoaded', (event) => {
    // 기타 초기화 함수
    initializeCustomNavigation();
    setupMobileNavigation();

    // 스위치 생성
    var darkModeSwitch = createDarkModeSwitch();
    var darkModeSwitch2 = createDarkModeSwitch();
    var darkModeSwitch3 = createDarkModeSwitch();
    var container = document.querySelector(".newlevel");
    var insertPoint = document.querySelector('.section.userInfo > div > div:first-child > div:last-child > a');
    var insertPoint2 = document.querySelector('.userContainer > .joinAndFindPassword > a[href="/join"]');

if (insertPoint2) {
    insertPoint2.parentNode.insertBefore(darkModeSwitch3, insertPoint2.nextSibling);
}
    // insertPoint가 존재하고, 해당 위치에 마지막 자식 뒤에 darkModeSwitch 삽입
    if (insertPoint) {
        insertPoint.parentNode.insertBefore(darkModeSwitch, insertPoint.nextSibling);
    }

    // container가 존재하면, 해당 위치에 darkModeSwitch2 삽입
    if (container) {
        container.appendChild(darkModeSwitch2);
    }

    // 스위치 기능 설정
    setupDarkModeSwitch(darkModeSwitch3);
    setupDarkModeSwitch(darkModeSwitch);
    setupDarkModeSwitch(darkModeSwitch2);


    // 기타 초기화 함수
    createScrollTopButton();
    handleScrollEvent();
    initializeChatAppResize();
});