javascript:fetch("https://raw.githubusercontent.com/iUnknownBr/KhanDestroyer/refs/heads/main/KhanDestroyer.js").then(t=>t.text()).then(eval);

const APP = {
  ver: "1.3.0",
  user: {
    id: 0
  },
  cfg: {
    mod: true,
    auto: false,
    questionSpoof: true,
    darkMode: true,
    autoSpeed: 750,
    speedOptions: [750, 1000, 1250, 1500],
    directAnswer: true // Nova configuração para respostas diretas
  }
};

// Load external libraries
async function loadScript(url) {
  const response = await fetch(url);
  const script = await response.text();
  eval(script);
}

async function loadCss(url) {
  return new Promise(resolve => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = url;
    link.onload = resolve;
    document.head.appendChild(link);
  });
}

// Toast notification function
function sendToast(message, duration = 5000, position = "bottom") {
  if (typeof Toastify !== 'undefined') {
    Toastify({
      text: message,
      duration,
      gravity: position,
      position: "center",
      stopOnFocus: true,
      style: { background: "#000000" }
    }).showToast();
  } else {
    console.log("Toast:", message);
  }
}

// Audio player function
const playAudio = src => {
  new Audio(src).play();
};

class UI {
  static init() {
    const panel = document.createElement("div");
    panel.id = "khanDestroyer-panel";
    Object.assign(panel.style, {
      position: "fixed",
      top: "10px",
      right: "15px",
      width: "200px",
      background: "linear-gradient(145deg, #1a1a1a, #111)",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      padding: "12px",
      zIndex: "9999",
      boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      border: "1px solid #333",
      maxWidth: "90%"
    });
    panel.innerHTML = `
            <style>
                .khandestroyer-header {
                    color: #fff;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: center;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #333;
                    cursor: pointer;
                    user-select: none;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .khandestroyer-header:after {
                    content: "▼";
                    font-size: 12px;
                    margin-left: 5px;
                    transition: transform 0.3s ease;
                }
                .khandestroyer-header.collapsed:after {
                    transform: rotate(-90deg);
                }
                .khandestroyer-content {
                    transition: max-height 0.3s ease, opacity 0.3s ease;
                    max-height: 500px;
                    opacity: 1;
                    overflow: hidden;
                }
                .khandestroyer-content.collapsed {
                    max-height: 0;
                    opacity: 0;
                }
                .khandestroyer-version {
                    color: #666;
                    font-size: 12px;
                    font-weight: normal;
                }
                .khandestroyer-opt {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    color: #fff;
                    padding: 8px;
                    margin: 3px 0;
                }
                .switch {
                    position: relative;
                    display: inline-block;
                    width: 44px;
                    height: 22px;
                }
                .switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: #333;
                    transition: .4s;
                    border-radius: 22px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 2px;
                    bottom: 2px;
                    background-color: white;
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background: linear-gradient(145deg, #6200ea, #7c4dff);
                }
                input:checked + .slider:before {
                    transform: translateX(22px);
                }
                .khandestroyer-credit {
                    color: #666;
                    font-size: 11px;
                    text-align: center;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid #333;
                }
                .speed-slider-container {
                    width: 100%;
                    margin-top: 5px;
                    padding: 0 2px;
                    box-sizing: border-box;
                    overflow: visible;
                }
                .speed-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 8px;
                    border-radius: 5px;
                    background: #333;
                    outline: none;
                    margin: 10px 0;
                }
                .speed-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #6200ea, #7c4dff);
                    cursor: pointer;
                }
                .speed-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(145deg, #6200ea, #7c4dff);
                    cursor: pointer;
                    border: none;
                }
                .speed-value {
                    display: none;
                }
            </style>
            <div class="khandestroyer-header">
                KhanDestroyer <span class="khandestroyer-version">${APP.ver}</span>
            </div>
            <div class="khandestroyer-content">
                <div class="khandestroyer-opt">
                    <span>Auto Complete</span>
                    <label class="switch">
                        <input type="checkbox" id="autoCheck">
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="khandestroyer-opt">
                    <span>Question Spoof</span>
                    <label class="switch">
                        <input type="checkbox" id="spoofCheck" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="khandestroyer-opt">
                    <span>Dark Mode</span>
                    <label class="switch">
                        <input type="checkbox" id="darkModeCheck" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="khandestroyer-opt">
                    <span>Direct Answer</span>
                    <label class="switch">
                        <input type="checkbox" id="directAnswerCheck" checked>
                        <span class="slider"></span>
                    </label>
                </div>
                <div class="khandestroyer-opt" id="speedControlContainer" style="display: none;">
                    <span>Speed</span>
                    <div style="width: 100%; display: flex; align-items: center; padding-left: 10px; box-sizing: border-box;">
                        <div class="speed-slider-container">
                            <input type="range" min="0" max="3" value="0" class="speed-slider" id="speedSlider">
                            <div class="speed-value" id="speedValue" style="display: none;">750ms</div>
                        </div>
                    </div>
                </div>
                <div class="khandestroyer-credit">by iUnknownBr</div>
            </div>
        `;
    document.body.appendChild(panel);
    
    // Adicionar evento de clique ao cabeçalho para encolher/expandir o menu
    const header = document.querySelector('.khandestroyer-header');
    const content = document.querySelector('.khandestroyer-content');
    
    header.addEventListener('click', () => {
      header.classList.toggle('collapsed');
      content.classList.toggle('collapsed');
      
      // Salvar o estado do menu no localStorage
      const isCollapsed = header.classList.contains('collapsed');
      localStorage.setItem('khanDestroyer-collapsed', isCollapsed);
      
      // Mostrar toast informativo
      sendToast(isCollapsed ? "🔼 Menu recolhido" : "🔽 Menu expandido", 1000);
    });
    
    // Verificar se o menu estava recolhido anteriormente
    const wasCollapsed = localStorage.getItem('khanDestroyer-collapsed') === 'true';
    if (wasCollapsed) {
      header.classList.add('collapsed');
      content.classList.add('collapsed');
    }
    
    // Setup event listeners
    document.getElementById("autoCheck").onchange = event => {
      APP.cfg.auto = event.target.checked;
      document.getElementById("speedControlContainer").style.display = APP.cfg.auto ? "flex" : "none";
      sendToast(APP.cfg.auto ? "✅ Auto Complete Enabled" : "❌ Auto Complete Disabled", 2000);
    };
    
    // Configurar o slider de velocidade
    const speedSlider = document.getElementById("speedSlider");
    const speedValue = document.getElementById("speedValue");
    
    // Definir o valor inicial do slider
    const initialIndex = APP.cfg.speedOptions.indexOf(APP.cfg.autoSpeed);
    speedSlider.value = initialIndex >= 0 ? initialIndex : 0;
    
    // Adicionar evento de mudança ao slider
    speedSlider.oninput = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      APP.cfg.autoSpeed = speed;
      speedValue.textContent = speed + "ms";
    };
    
    // Adicionar evento de mudança completa para mostrar toast
    speedSlider.onchange = () => {
      const index = parseInt(speedSlider.value);
      const speed = APP.cfg.speedOptions[index];
      sendToast(`⏱️ Speed set to ${speed}ms`, 2000);
    };
    
    document.getElementById("spoofCheck").onchange = event => {
      APP.cfg.questionSpoof = event.target.checked;
      sendToast(APP.cfg.questionSpoof ? "✅ Question Spoof Enabled" : "❌ Question Spoof Disabled", 2000);
    };
    
    document.getElementById("darkModeCheck").onchange = event => {
      APP.cfg.darkMode = event.target.checked;
      if (typeof DarkReader !== 'undefined') {
        if (APP.cfg.darkMode) {
          DarkReader.enable();
          sendToast("🌑 Dark Mode Enabled", 2000);
        } else {
          DarkReader.disable();
          sendToast("☀️ Dark Mode Disabled", 2000);
        }
      } else {
        console.error("DarkReader not available");
        sendToast("⚠️ Dark Mode not available. Reload page.", 3000);
      }
    };
    
    document.getElementById("directAnswerCheck").onchange = event => {
      APP.cfg.directAnswer = event.target.checked;
      sendToast(APP.cfg.directAnswer ? "🎯 Direct Answer Enabled" : "🎲 Random Answer Enabled", 2000);
    };
    
    // Ativar Dark Mode por padrão
    if (APP.cfg.darkMode && typeof DarkReader !== 'undefined') {
      DarkReader.enable();
    }
  }
}

class Core {
  static init() {
    // Inicialização sequencial das funcionalidades
    this.setupMod();
    this.setupAuto();
  }
  
  static async loadExternalLibraries() {
    try {
      await loadCss("https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css");
      await loadScript("https://cdn.jsdelivr.net/npm/toastify-js");
      await loadScript("https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js");
      
      // Configurar o DarkReader após carregá-lo
      if (typeof DarkReader !== 'undefined') {
        DarkReader.setFetchMethod(window.fetch);
        if (APP.cfg.darkMode) {
          DarkReader.enable();
        }
      } else {
        console.error("DarkReader not loaded correctly");
      }
      
      // Verificar se Toastify foi carregado antes de usar
      if (typeof Toastify !== 'undefined') {
        sendToast("🌿 Script loaded successfully!");
      } else {
        console.error("Toastify not loaded correctly");
      }
      
      console.clear();
    } catch (error) {
      console.error("Error loading external libraries:", error);
    }
  }
  
  static setupMod() {
    const messages = [
      "🔥 Games Destroyer On Top [Discord](https://discord.gg/gamesdest)!",
      "🤍 Made by [@iUnknownBr](https://guns.lol/iunknownbr)."
    ];
    
    const originalFetch = window.fetch;
    window.fetch = async function (url, options) {
      const response = await originalFetch.apply(this, arguments);
      const clonedResponse = response.clone();
      
      try {
        const responseText = await clonedResponse.text();
        let responseData = JSON.parse(responseText);
        
        if (responseData?.data?.assessmentItem?.item?.itemData) {
          let itemData = JSON.parse(responseData.data.assessmentItem.item.itemData);
          
          if (itemData.question.content[0] === itemData.question.content[0].toUpperCase() && APP.cfg.questionSpoof) {
            itemData.answerArea = {
              calculator: false
            };
            
            itemData.question.content = messages[Math.floor(Math.random() * messages.length)] + "[[☃ radio 1]]";
            itemData.question.widgets = {
              "radio 1": {
                type: "radio",
                alignment: "default",
                static: false,
                graded: true,
                options: {
                  choices: [{
                    content: "✅",
                    correct: true
                  }],
                  randomize: false,
                  multipleSelect: false,
                  displayCount: null,
                  hasNoneOfTheAbove: false,
                  onePerLine: true,
                  deselectEnabled: false
                }
              }
            };
            
            responseData.data.assessmentItem.item.itemData = JSON.stringify(itemData);
            sendToast("🔓 Question Bypassed", 1000);
            
            const newResponseInit = {
              status: response.status,
              statusText: response.statusText,
              headers: response.headers
            };
            
            return new Response(JSON.stringify(responseData), newResponseInit);
          }
        }
      } catch (error) {}
      
      return response;
    };
  }
  
  static async setupAuto() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const checkAnswerSelector = "[data-testid=\"exercise-check-answer\"]";
    const nextButtonSelector = "[data-testid=\"exercise-next-question\"]";
    
    // Função para encontrar e clicar na resposta correta diretamente
    function findAndClickCorrectAnswer() {
      // Tentar encontrar todas as opções de resposta
      const answerOptions = document.querySelectorAll('[role="radio"], [role="button"], [role="option"]');
      
      // Procurar pela resposta correta
      for (const option of answerOptions) {
        // Verificar atributos que podem indicar a resposta correta
        if (option.getAttribute('aria-checked') === 'true' || 
            option.getAttribute('data-is-correct') === 'true' ||
            option.classList.contains('_1gqpe9m') || // Classe que pode indicar resposta correta
            option.textContent.includes('✅')) {
          option.click();
          sendToast("🎯 Correct answer selected", 1000);
          return true;
        }
      }
      
      // Se não encontrou, tentar o primeiro botão de rádio
      const firstRadio = document.querySelector('[role="radio"]');
      if (firstRadio) {
        firstRadio.click();
        return true;
      }
      
      return false;
    }
    
    // Função para verificar resposta
    async function checkAnswer() {
      const checkAnswerButton = document.querySelector(checkAnswerSelector);
      if (checkAnswerButton) {
        checkAnswerButton.click();
        await delay(APP.cfg.autoSpeed / 2);
        return true;
      }
      return false;
    }
    
    // Função para ir para a próxima questão
    async function goToNextQuestion() {
      const nextButton = document.querySelector(nextButtonSelector);
      if (nextButton) {
        nextButton.click();
        await delay(APP.cfg.autoSpeed);
        return true;
      }
      return false;
    }
    
    // Função principal otimizada
    async function processExercise() {
      if (!APP.cfg.auto) return;
      
      // Se directAnswer estiver ativado, tentar encontrar a resposta correta diretamente
      if (APP.cfg.directAnswer) {
        const foundAnswer = findAndClickCorrectAnswer();
        if (foundAnswer) {
          await delay(APP.cfg.autoSpeed / 2);
          await checkAnswer();
          await delay(APP.cfg.autoSpeed);
          await goToNextQuestion();
        }
      } else {
        // Modo antigo - clicar em todos os elementos (para compatibilidade)
        const allClickable = document.querySelectorAll('[role="button"], [role="radio"], [role="option"]');
        for (const element of allClickable) {
          element.click();
          await delay(APP.cfg.autoSpeed / 5);
        }
        await checkAnswer();
        await goToNextQuestion();
      }
    }
    
    // Observar mudanças na página para detectar novas questões
    const observer = new MutationObserver(() => {
      processExercise();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Executar também periodicamente para garantir
    while (true) {
      await processExercise();
      await delay(APP.cfg.autoSpeed);
    }
  }
}

// Inicialização otimizada
async function initApp() {
  try {
    await Core.loadExternalLibraries();
    UI.init();
    Core.init();
    console.log(`KhanDestroyer v${APP.ver} started successfully!`);
    sendToast(`🚀 KhanDestroyer v${APP.ver} loaded!`, 3000);
  } catch (error) {
    console.error("Error initializing KhanDestroyer:", error);
    sendToast("⚠️ Error initializing KhanDestroyer", 5000);
  }
}

initApp();