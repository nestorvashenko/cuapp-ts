// ColdOS Application: tapok
// Функция должна быть доступна глобально для вызова из ОС

function user_run_application_tapok() {
  const id_app = "tapok";
  const height = "600";
  const width = "800";
  const icon_app = `/coldos/osdata/Applications/User/${id_app}/${id_app}${ui_themeicons}.png`;

  // Проверка: если приложение уже открыто, просто фокусируемся на него
  if (document.getElementById(id_app)) {
    Window_focus(id_app);
    return;
  }

  // Конфигурация окна приложения
  const config = {
    enabled: true,
    resizeWidth: true,
    maximizable: true,
    minWidth: 400,
    maxWidth: 1000,
    resizeHeight: true,
    minHeight: 300,
    maxHeight: 800,
    icon: icon_app,
    tooltip: "tapok",
    actiontext: "tapok"
  };

  // HTML разметка окна
  const htmlcode = `
    <div class="titledrag" style="height: 60px; width: calc(100% - 160px); position: absolute; left: 50px; user-select: none; z-index: 200;" ondblclick="Window_maximize('${id_app}')" onmousedown="move.window_systemos_api('.window', '${id_app}')"></div>
    <div id="titlebar" style="display: flex; gap: 10px; margin-top: 17px; margin-left: 17px;">
      <div class="text_ui" style="font-size: 20px; font-family: CG-Bold;">tapok</div>
      <div style="position: absolute; right: 21px; top: 21px;">
        <button class="minimize" tip="Свернуть" onclick="Window_minimize('${id_app}'); clicksound()"></button>
        <button class="maximize" tip="Развернуть" onclick="Window_maximize('${id_app}'); clicksound()"></button>
        <button class="close" tip="Закрыть" onclick="Window_kill('${id_app}',true,true); clicksound()"></button>
      </div>
    </div>
    <div id="allcontent" class="allcontent">
      <h3>Привет из tapok!</h3>
      <p>Это твое минималистичное приложение ColdOS</p>
    </div>
  `;

  // Инициализация переменных для приложения
  const indicator = true;
  const timeapp_data = 'application_id_' + Date.now() + '_';

  // JavaScript код приложения
  const jswin = `
    // Здесь может быть дополнительный JS код
    console.log('Приложение tapok загружено');
  `;

  // Создание окна в системе ColdOS
  Window_add(htmlcode, id_app, height, width, indicator, config, true, "user", jswin);

  // Проверка минимальных размеров (нужна для Миши)
  setTimeout(() => {
    if (width < 400) {
      Window_kill(document.getElementById(`${id_app}`));
      popup('critical', 'AppReport', `Размер окна 'Width' не может быть меньше 400`, 'ОК', '', 1, true, false, '', '');
    }
    if (height < 300) {
      Window_kill(document.getElementById(`${id_app}`));
      popup('critical', 'AppReport', `Размер окна 'Height' не может быть меньше 300`, 'ОК', '', 1, true, false, '', '');
    }
  }, 400);
}

// ❌ УБРАЛИ export {} - она изолировала контекст!
