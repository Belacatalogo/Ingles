(function () {
  var e = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;

  var page = {
    minHeight: "100vh",
    background: "#12100e",
    color: "#f4efe6",
    fontFamily: "Georgia, 'Iowan Old Style', Palatino, serif",
  };
  var sans = { fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" };
  var ink = "#12100e";
  var copper = "#e4a15a";
  var line = "rgba(244,239,230,.14)";
  var muted = "#b7ab9d";
  var good = "#8fbf8a";
  var bad = "#e08b78";

  function norm(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9' ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    var utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.92;
    window.speechSynthesis.speak(utter);
  }

  function speakLines(lines, done) {
    if (!window.speechSynthesis) {
      done();
      return;
    }
    window.speechSynthesis.cancel();
    var index = 0;
    function next() {
      if (index >= lines.length) {
        done();
        return;
      }
      var utter = new SpeechSynthesisUtterance(lines[index].en);
      utter.lang = "en-US";
      utter.rate = 0.92;
      utter.onend = function () {
        index += 1;
        next();
      };
      utter.onerror = function () {
        index += 1;
        next();
      };
      window.speechSynthesis.speak(utter);
    }
    next();
  }

  function listenOnce(done) {
    var Rec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Rec) {
      done("");
      return;
    }
    var rec = new Rec();
    rec.lang = "en-US";
    rec.onresult = function (event) {
      done(event.results[0][0].transcript || "");
    };
    rec.onerror = function () {
      done("");
    };
    rec.start();
  }

  var KEY = "fluency.pillars.v1";
  function readProgress() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{"done":{}}');
    } catch (error) {
      return { done: {} };
    }
  }
  function writeDone(id, line) {
    var data = readProgress();
    data.done[id] = { line: line, at: new Date().toISOString() };
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  var LESSONS = [
    {
      id: "g-to-be",
      pillar: "Gramática",
      title: "I am, you are",
      minutes: 7,
      focus: "Apresentar alguém com am, is e are. Sem have.",
      keep: "I am Luis.",
    },
    {
      id: "l-names",
      pillar: "Listening",
      title: "Nomes no oi",
      minutes: 6,
      focus: "Ouvir um oi e pegar os nomes. Sem ler antes.",
      keep: "Nice to meet you.",
    },
    {
      id: "s-hello",
      pillar: "Speaking",
      title: "Dizer o seu nome",
      minutes: 6,
      focus: "Falar Hi, I'm… com a sua voz.",
      keep: "Hi. I'm Luis.",
    },
    {
      id: "v-greet",
      pillar: "Vocabulário",
      title: "Cinco cumprimentos",
      minutes: 5,
      focus: "Hello, hi, goodbye, please, thank you.",
      keep: "Thank you.",
    },
    {
      id: "r-profile",
      pillar: "Reading",
      title: "Um perfil curto",
      minutes: 6,
      focus: "Achar nome, cidade e trabalho no texto.",
      keep: "I am from Brasília.",
    },
    {
      id: "w-two",
      pillar: "Writing",
      title: "Duas frases suas",
      minutes: 6,
      focus: "Escrever nome e origem. Sem áudio.",
      keep: "I am from Brasília.",
    },
  ];

  function button(label, onClick, disabled, primary) {
    return e(
      "button",
      {
        type: "button",
        onClick: onClick,
        disabled: disabled,
        style: Object.assign({ border: "0", cursor: disabled ? "default" : "pointer" }, primary ? primaryBtn(disabled) : ghostBtn),
      },
      label
    );
  }

  var primaryBtn = function (disabled) {
    return {
      height: "48px",
      flex: 1,
      borderRadius: "999px",
      background: copper,
      color: ink,
      fontSize: "16px",
      fontWeight: 600,
      opacity: disabled ? 0.4 : 1,
    };
  };
  var ghostBtn = {
    height: "48px",
    borderRadius: "999px",
    border: "1px solid " + line,
    background: "transparent",
    color: "#f4efe6",
    padding: "0 18px",
    fontSize: "16px",
  };

  function Shell(props) {
    return e(
      "div",
      { style: page },
      e(
        "div",
        { style: { maxWidth: "32rem", margin: "0 auto", minHeight: "100vh", display: "flex", flexDirection: "column" } },
        e(
          "header",
          { style: Object.assign({ position: "sticky", top: 0, background: "#12100e", borderBottom: "1px solid " + line, padding: "12px 20px" }, sans) },
          e(
            "div",
            { style: { display: "flex", gap: "12px", alignItems: "center" } },
            e("a", { href: "#/", style: Object.assign({}, ghostBtn, { width: "44px", display: "grid", placeItems: "center", textDecoration: "none" }) }, "←"),
            e(
              "div",
              null,
              e("p", { style: { margin: 0, color: copper, fontSize: "14px" } }, props.pillar + " · " + props.title),
              e("p", { style: { margin: "2px 0 0", fontSize: "16px" } }, props.step + " · " + (props.index + 1) + " de " + props.total)
            )
          ),
          e(
            "div",
            { style: { marginTop: "12px", height: "4px", background: "#2a261f", borderRadius: "99px", overflow: "hidden" } },
            e("div", { style: { height: "100%", width: ((props.index + 1) / props.total) * 100 + "%", background: copper } })
          )
        ),
        e("main", { style: { flex: 1, padding: "24px 20px 140px" } }, props.children),
        e(
          "footer",
          { style: { position: "fixed", left: 0, right: 0, bottom: 0, background: "#12100e", borderTop: "1px solid " + line, padding: "16px 20px calc(16px + env(safe-area-inset-bottom))" } },
          e(
            "div",
            { style: Object.assign({ maxWidth: "32rem", margin: "0 auto", display: "flex", gap: "12px" }, sans) },
            props.onBack ? button("Voltar", props.onBack, false, false) : null,
            button(props.nextLabel, props.onNext, !props.canNext, true)
          )
        )
      )
    );
  }

  function Choices(props) {
    var picked = useState(null);
    var pick = picked[0];
    var setPick = picked[1];
    return e(
      "div",
      null,
      e("h1", { style: { fontSize: "32px", lineHeight: 1.15, fontWeight: 500, margin: 0 } }, props.ask),
      e(
        "div",
        { style: { display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" } },
        props.options.map(function (option, optionIndex) {
          var show = pick !== null && (optionIndex === pick || optionIndex === props.answer);
          var ok = optionIndex === props.answer;
          return e(
            "button",
            {
              key: option,
              type: "button",
              disabled: pick !== null,
              onClick: function () {
                setPick(optionIndex);
                props.onDone(optionIndex === props.answer);
              },
              style: {
                textAlign: "left",
                minHeight: "56px",
                borderRadius: "16px",
                border: "1px solid " + (show ? (ok ? good : bad) : line),
                background: "#1c1915",
                color: show ? (ok ? good : bad) : "#f4efe6",
                padding: "16px",
                fontSize: "18px",
              },
            },
            option
          );
        })
      ),
      pick !== null ? e("p", { style: Object.assign({ color: muted, marginTop: "16px", lineHeight: 1.5 }, sans) }, props.why) : null
    );
  }

  function Grammar() {
    var step = useState(0);
    var index = step[0];
    var setIndex = step[1];
    var readyState = useState(true);
    var ready = readyState[0];
    var setReady = readyState[1];
    var steps = ["Quadro", "Exemplos", "Aponte", "Escolha", "Escolha", "Corrigir", "Escrever", "Levar"];
    function go(next) {
      setIndex(next);
      setReady(next === 0 || next === 1 || next === steps.length - 1);
    }
    function finish() {
      writeDone("g-to-be", "I am Luis.");
      location.hash = "#/";
    }
    var body = null;
    if (index === 0) {
      body = e(
        "div",
        null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de gramática"),
        e("h1", { style: { fontSize: "36px", lineHeight: 1.1, fontWeight: 500, margin: "8px 0 0" } }, "To be no presente"),
        e("p", { style: Object.assign({ color: muted, lineHeight: 1.5 }, sans) }, "I am, you are, he/she/it is. Idade não usa have."),
        e(
          "div",
          { style: { marginTop: "20px" } },
          [
            ["I", "am", "I am Luis."],
            ["you", "are", "You are in class."],
            ["she", "is", "She is from Brasília."],
          ].map(function (row) {
            return e(
              "button",
              {
                key: row[2],
                type: "button",
                onClick: function () {
                  speak(row[2]);
                },
                style: { display: "flex", width: "100%", gap: "12px", textAlign: "left", background: "transparent", color: "#f4efe6", border: 0, borderTop: "1px solid " + line, padding: "14px 0" },
              },
              e("span", { style: Object.assign({ width: "48px", color: muted }, sans) }, row[0]),
              e("span", { style: { width: "52px", color: copper, fontSize: "24px" } }, row[1]),
              e("span", { style: Object.assign({ fontSize: "16px" }, sans) }, row[2])
            );
          })
        ),
        e("p", { style: Object.assign({ color: bad, textDecoration: "line-through", marginTop: "20px" }, sans) }, "I have 28 years."),
        e("p", { style: { color: good, fontSize: "28px", margin: "8px 0 0" } }, "I am 28."),
        e("p", { style: Object.assign({ lineHeight: 1.5 }, sans) }, "Have é ter um objeto. Nome, idade e origem usam am, is ou are.")
      );
    } else if (index === 1) {
      body = e(
        "div",
        null,
        e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, "Ouça só a forma."),
        ["I am Luis.", "You are my teacher.", "She is from Brasília."].map(function (lineText) {
          return e(
            "button",
            {
              key: lineText,
              type: "button",
              onClick: function () {
                speak(lineText);
              },
              style: { display: "block", width: "100%", textAlign: "left", marginTop: "12px", padding: "16px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", fontSize: "24px" },
            },
            lineText
          );
        })
      );
    } else if (index === 2) {
      body = e(Choices, { key: "spot", ask: "She ___ from Brasília.", options: ["am", "is", "are"], answer: 1, why: "She pede is. Am é só de I.", onDone: function () { setReady(true); } });
    } else if (index === 3) {
      body = e(Choices, { key: "i-am", ask: "I ___ Ana.", options: ["am", "is", "are"], answer: 0, why: "I am. Nunca I is.", onDone: function () { setReady(true); } });
    } else if (index === 4) {
      body = e(Choices, { key: "you-are", ask: "You ___ in Brasília.", options: ["am", "is", "are"], answer: 2, why: "You are.", onDone: function () { setReady(true); } });
    } else if (index === 5) {
      body = e(FixStep, { wrong: "She am from Brazil.", answer: "She is from Brazil.", why: "Am fica preso em I. She is.", onDone: function () { setReady(true); } });
    } else if (index === 6) {
      body = e(WriteStep, { ask: "Escreva o seu nome com I am.", accept: "i am", reject: ["i is", "i are", "i have"], onDone: function () { setReady(true); } });
    } else {
      body = e(
        "div",
        null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "A regra que fica"),
        e("h1", { style: { fontSize: "40px", fontWeight: 500, margin: "8px 0 0" } }, "I am Luis."),
        e("p", { style: Object.assign({ color: muted, fontSize: "18px" }, sans) }, "Eu sou o Luis. Troque Luis pelo seu nome."),
        e("p", { style: Object.assign({ marginTop: "16px" }, sans) }, "I am · you are · he/she/it is.")
      );
    }
    return e(Shell, {
      pillar: "Gramática",
      title: "I am, you are",
      step: steps[index],
      index: index,
      total: steps.length,
      canNext: ready,
      nextLabel: index === steps.length - 1 ? "Guardar a regra" : "Continuar",
      onBack: index > 0 ? function () { go(index - 1); } : null,
      onNext: function () { index === steps.length - 1 ? finish() : go(index + 1); },
      children: body,
    });
  }

  function FixStep(props) {
    var valueState = useState("");
    var value = valueState[0];
    var setValue = valueState[1];
    var checkedState = useState(false);
    var checked = checkedState[0];
    var setChecked = checkedState[1];
    var ok = norm(value) === norm(props.answer);
    return e(
      "div",
      null,
      e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, "Corrija a forma."),
      e("p", { style: Object.assign({ color: bad, border: "1px solid " + line, borderRadius: "16px", padding: "16px" }, sans) }, props.wrong),
      e("input", {
        value: value,
        onChange: function (event) {
          setValue(event.target.value);
          setChecked(false);
        },
        style: Object.assign({ width: "100%", height: "48px", marginTop: "12px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "0 16px", fontSize: "18px" }, sans),
      }),
      !checked
        ? button("Conferir", function () { setChecked(true); props.onDone(); }, !value.trim(), false)
        : e("p", { style: Object.assign({ color: muted }, sans) }, ok ? props.why : props.why + " Modelo: " + props.answer)
    );
  }

  function WriteStep(props) {
    var valueState = useState("");
    var value = valueState[0];
    var setValue = valueState[1];
    var checkedState = useState(false);
    var checked = checkedState[0];
    var setChecked = checkedState[1];
    var got = norm(value);
    var badForm = props.reject.some(function (item) { return got.indexOf(item) !== -1; });
    var ok = got.indexOf(props.accept) !== -1 && !badForm;
    return e(
      "div",
      null,
      e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, props.ask),
      e("textarea", {
        value: value,
        rows: 3,
        onChange: function (event) {
          setValue(event.target.value);
          setChecked(false);
        },
        style: Object.assign({ width: "100%", marginTop: "16px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "12px 16px", fontSize: "18px" }, sans),
      }),
      !checked
        ? button("Conferir", function () { setChecked(true); props.onDone(); }, !value.trim(), false)
        : e("p", { style: Object.assign({ color: ok ? good : muted }, sans) }, ok ? "A forma está certa." : "Ainda não. Comece com I am.")
    );
  }

  function Listening() {
    var step = useState(0);
    var index = step[0];
    var setIndex = step[1];
    var heardState = useState(false);
    var heard = heardState[0];
    var setHeard = heardState[1];
    var playingState = useState(false);
    var playing = playingState[0];
    var setPlaying = playingState[1];
    var readyState = useState(true);
    var ready = readyState[0];
    var setReady = readyState[1];
    var openState = useState(false);
    var open = openState[0];
    var setOpen = openState[1];
    var draftState = useState("");
    var draft = draftState[0];
    var setDraft = draftState[1];
    var checkedState = useState(false);
    var checked = checkedState[0];
    var setChecked = checkedState[1];
    var lines = [
      { who: "Lia", en: "Hi. I'm Lia.", pt: "Oi. Eu sou a Lia." },
      { who: "Luis", en: "Hello. I'm Luis.", pt: "Olá. Eu sou o Luis." },
      { who: "Lia", en: "Nice to meet you.", pt: "Prazer em te conhecer." },
    ];
    var steps = ["Ouvido", "Escuta", "Pergunta", "Pergunta", "Ditado", "Texto", "Levar"];
    function play() {
      setPlaying(true);
      speakLines(lines, function () {
        setPlaying(false);
        setHeard(true);
        if (index === 1) setReady(true);
      });
    }
    function go(next) {
      window.speechSynthesis && window.speechSynthesis.cancel();
      setIndex(next);
      if (next === 1) setReady(heard);
      else if (next === 4) setReady(checked);
      else if (next === 5) setReady(open);
      else if (next === 0 || next === steps.length - 1) setReady(true);
      else setReady(false);
    }
    var body = null;
    if (index === 0) {
      body = e("div", null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de listening"),
        e("h1", { style: { fontSize: "40px", fontWeight: 500, margin: "8px 0 0" } }, "Só o ouvido."),
        e("p", { style: Object.assign({ fontSize: "18px", lineHeight: 1.5 }, sans) }, "Lia e Luis se cumprimentam. O texto fica fechado até você responder.")
      );
    } else if (index === 1) {
      body = e("div", { style: { textAlign: "center", paddingTop: "32px" } },
        e("button", { type: "button", onClick: play, style: { width: "144px", height: "144px", borderRadius: "999px", border: 0, background: copper, color: ink, fontSize: "18px", fontWeight: 700 } }, playing ? "…" : "Ouvir"),
        e("p", { style: { fontSize: "28px", marginTop: "20px" } }, playing ? "Ouvindo…" : heard ? "Ouça de novo se precisar" : "Toque para ouvir"),
        e("p", { style: Object.assign({ color: muted }, sans) }, "Nenhuma palavra na tela até você responder.")
      );
    } else if (index === 2) {
      body = e("div", null,
        e("button", { type: "button", onClick: play, style: Object.assign({ background: "transparent", color: copper, border: 0, marginBottom: "12px" }, sans) }, "Ouvir de novo"),
        e(Choices, { key: "lia", ask: "Qual é o nome dela?", options: ["Ana", "Lia", "Maria"], answer: 1, why: "A primeira voz diz I'm Lia.", onDone: function () { setReady(true); } })
      );
    } else if (index === 3) {
      body = e("div", null,
        e("button", { type: "button", onClick: play, style: Object.assign({ background: "transparent", color: copper, border: 0, marginBottom: "12px" }, sans) }, "Ouvir de novo"),
        e(Choices, { key: "luis", ask: "O que o Luis diz?", options: ["I'm Luis.", "I like coffee.", "Good night."], answer: 0, why: "A segunda voz diz Hello. I'm Luis.", onDone: function () { setReady(true); } })
      );
    } else if (index === 4) {
      var dictOk = norm(draft).indexOf("nice to meet you") !== -1;
      body = e("div", null,
        e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, "Escreva a última fala da Lia."),
        e("button", { type: "button", onClick: play, style: Object.assign({ background: "transparent", color: copper, border: 0, margin: "12px 0" }, sans) }, "Ouvir a cena de novo"),
        e("textarea", { value: draft, rows: 3, onChange: function (event) { setDraft(event.target.value); setChecked(false); setReady(false); }, style: Object.assign({ width: "100%", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "12px", fontSize: "18px" }, sans) }),
        !checked
          ? button("Conferir o ditado", function () { setChecked(true); setReady(true); }, !draft.trim(), false)
          : e("p", { style: Object.assign({ color: muted }, sans) }, dictOk ? "Você pegou a fala." : "O que foi dito: Nice to meet you.")
      );
    } else if (index === 5) {
      body = e("div", null,
        e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, "Agora o texto."),
        !open
          ? button("Abrir a transcrição", function () { setOpen(true); setReady(true); }, false, false)
          : e("div", null, lines.map(function (lineItem) {
            return e("div", { key: lineItem.en, style: { marginTop: "12px", padding: "16px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915" } },
              e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, lineItem.who),
              e("p", { style: { fontSize: "24px", margin: "4px 0" } }, lineItem.en),
              e("p", { style: Object.assign({ color: muted, margin: 0 }, sans) }, lineItem.pt)
            );
          }))
      );
    } else {
      body = e("div", null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "O que o ouvido guardou"),
        e("h1", { style: { fontSize: "36px", fontWeight: 500 } }, "Nice to meet you.")
      );
    }
    return e(Shell, {
      pillar: "Listening",
      title: "Nomes no oi",
      step: steps[index],
      index: index,
      total: steps.length,
      canNext: ready,
      nextLabel: index === steps.length - 1 ? "Guardar o que ouvi" : "Continuar",
      onBack: index > 0 ? function () { go(index - 1); } : null,
      onNext: function () {
        if (index === steps.length - 1) {
          writeDone("l-names", "Nice to meet you.");
          location.hash = "#/";
        } else go(index + 1);
      },
      children: body,
    });
  }

  function matchesSpeech(value) {
    var got = norm(value);
    if (!got || got.indexOf("i have") !== -1 || got.indexOf("i is") !== -1) return false;
    return got.indexOf("i m") !== -1 || got.indexOf("i am") !== -1 || got.indexOf("my name is") !== -1;
  }

  function SpeakBox(props) {
    var listening = useState(false);
    var isListening = listening[0];
    var setListening = listening[1];
    return e("div", null,
      e("h1", { style: { fontSize: "32px", fontWeight: 500, margin: 0 } }, props.title),
      e("button", {
        type: "button",
        onClick: function () {
          setListening(true);
          listenOnce(function (heard) {
            setListening(false);
            if (heard) props.onChange(heard);
          });
        },
        style: { marginTop: "20px", width: "100%", height: "56px", border: 0, borderRadius: "999px", background: copper, color: ink, fontSize: "16px", fontWeight: 700 },
      }, isListening ? "Ouvindo você…" : "Falar"),
      e("textarea", {
        value: props.value,
        rows: 3,
        placeholder: "Ou escreva o que você disse",
        onChange: function (event) { props.onChange(event.target.value); },
        style: Object.assign({ width: "100%", marginTop: "12px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "12px", fontSize: "18px" }, sans),
      }),
      props.checked === null
        ? button("Conferir a fala", props.onCheck, !props.value.trim(), false)
        : e("p", { style: Object.assign({ color: props.checked ? good : muted }, sans) }, props.checked ? "A estrutura saiu." : "Modelo: " + props.model)
    );
  }

  function Speaking() {
    var step = useState(0);
    var index = step[0];
    var setIndex = step[1];
    var heard = useState(false);
    var heardModel = heard[0];
    var setHeard = heard[1];
    var saidState = useState("");
    var said = saidState[0];
    var setSaid = saidState[1];
    var answerState = useState("");
    var answer = answerState[0];
    var setAnswer = answerState[1];
    var repeatOk = useState(null);
    var repeat = repeatOk[0];
    var setRepeat = repeatOk[1];
    var answerOk = useState(null);
    var answered = answerOk[0];
    var setAnswered = answerOk[1];
    var steps = ["Modelo", "Repetir", "Responder", "Levar"];
    var canNext = (index === 0 && heardModel) || (index === 1 && repeat !== null) || (index === 2 && answered !== null) || index === 3;
    var body = null;
    if (index === 0) {
      body = e("div", null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de speaking"),
        e("h1", { style: { fontSize: "36px", fontWeight: 500, margin: "8px 0 16px" } }, "Ouça o modelo inteiro antes de falar."),
        e("button", {
          type: "button",
          onClick: function () { speak("Hi. I'm Luis."); setHeard(true); },
          style: { width: "100%", textAlign: "left", borderRadius: "24px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "20px" },
        }, e("span", { style: { display: "block", color: muted, fontFamily: sans.fontFamily, fontSize: "14px" } }, "Modelo"), e("span", { style: { display: "block", fontSize: "36px", marginTop: "8px" } }, "Hi. I'm Luis."))
      );
    } else if (index === 1) {
      body = e(SpeakBox, { title: "Repita. Troque o nome se quiser.", value: said, onChange: function (value) { setSaid(value); setRepeat(null); }, checked: repeat, onCheck: function () { setRepeat(matchesSpeech(said)); }, model: "Hi. I'm Luis." });
    } else if (index === 2) {
      body = e("div", null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Ana"),
        e("button", { type: "button", onClick: function () { speak("What's your name?"); }, style: { display: "block", width: "100%", textAlign: "left", marginTop: "8px", padding: "16px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", fontSize: "28px" } }, "What's your name?"),
        e("div", { style: { marginTop: "20px" } }, e(SpeakBox, { title: "Responda em voz alta.", value: answer, onChange: function (value) { setAnswer(value); setAnswered(null); }, checked: answered, onCheck: function () { setAnswered(matchesSpeech(answer)); }, model: "I'm Luis." }))
      );
    } else {
      body = e("div", null,
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "A fala que fica"),
        e("h1", { style: { fontSize: "40px", fontWeight: 500 } }, "Hi. I'm Luis."),
        button("Ouvir de novo", function () { speak("Hi. I'm Luis."); }, false, false)
      );
    }
    return e(Shell, {
      pillar: "Speaking",
      title: "Dizer o seu nome",
      step: steps[index],
      index: index,
      total: steps.length,
      canNext: canNext,
      nextLabel: index === 3 ? "Guardar a fala" : "Continuar",
      onBack: index > 0 ? function () { setIndex(index - 1); } : null,
      onNext: function () {
        if (index === 3) {
          writeDone("s-hello", "Hi. I'm Luis.");
          location.hash = "#/";
        } else setIndex(index + 1);
      },
      children: body,
    });
  }

  function SimpleLesson(props) {
    var step = useState(0);
    var index = step[0];
    var setIndex = step[1];
    var readyState = useState(props.steps[0].ready !== false);
    var ready = readyState[0];
    var setReady = readyState[1];
    var current = props.steps[index];
    return e(Shell, {
      pillar: props.pillar,
      title: props.title,
      step: current.name,
      index: index,
      total: props.steps.length,
      canNext: ready,
      nextLabel: index === props.steps.length - 1 ? "Guardar" : "Continuar",
      onBack: index > 0 ? function () { setIndex(index - 1); setReady(true); } : null,
      onNext: function () {
        if (index === props.steps.length - 1) {
          writeDone(props.id, props.keep);
          location.hash = "#/";
        } else {
          var next = index + 1;
          setIndex(next);
          setReady(props.steps[next].ready !== false);
        }
      },
      children: current.render(function () { setReady(true); }),
    });
  }

  function Vocabulary() {
    var words = [
      ["hello", "olá", "Chegada, um pouco mais formal que hi."],
      ["hi", "oi", "Chegada curta."],
      ["goodbye", "tchau", "Saída."],
      ["please", "por favor", "No pedido."],
      ["thank you", "obrigado", "Depois de receber."],
    ];
    return e(SimpleLesson, {
      id: "v-greet",
      pillar: "Vocabulário",
      title: "Cinco cumprimentos",
      keep: "Thank you.",
      steps: [
        {
          name: "Palavras",
          render: function () {
            return e("div", null,
              e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de vocabulário"),
              e("h1", { style: { fontSize: "32px", fontWeight: 500 } }, "Cinco palavras. Toque para ouvir."),
              words.map(function (word) {
                return e("button", { key: word[0], type: "button", onClick: function () { speak(word[0]); }, style: { display: "block", width: "100%", textAlign: "left", marginTop: "12px", padding: "16px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6" } },
                  e("span", { style: { display: "block", fontSize: "28px" } }, word[0]),
                  e("span", { style: Object.assign({ color: muted }, sans) }, word[1] + " · " + word[2])
                );
              })
            );
          },
        },
        {
          name: "Uso",
          ready: false,
          render: function (done) {
            return e(Choices, { ask: "Você está saindo. Qual palavra?", options: ["hello", "goodbye", "please"], answer: 1, why: "Goodbye fecha. Hello abre.", onDone: done });
          },
        },
        {
          name: "Levar",
          render: function () {
            return e("h1", { style: { fontSize: "40px", fontWeight: 500 } }, "Thank you.");
          },
        },
      ],
    });
  }

  function Reading() {
    var text = "Hi. I am Luis. I am from Brasília. I am a student. You are my teacher. Her name is Ana.";
    return e(SimpleLesson, {
      id: "r-profile",
      pillar: "Reading",
      title: "Um perfil curto",
      keep: "I am from Brasília.",
      steps: [
        {
          name: "Texto",
          render: function () {
            return e("div", null,
              e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de reading"),
              e("p", { style: { fontSize: "26px", lineHeight: 1.35, padding: "16px", border: "1px solid " + line, borderRadius: "16px" } }, text)
            );
          },
        },
        {
          name: "Ideia",
          ready: false,
          render: function (done) {
            return e("div", null,
              e("p", { style: { fontSize: "20px", lineHeight: 1.4 } }, text),
              e("div", { style: { marginTop: "16px" } }, e(Choices, { ask: "De onde o Luis é?", options: ["São Paulo", "Brasília", "O texto não diz"], answer: 1, why: "A frase é I am from Brasília.", onDone: done }))
            );
          },
        },
        {
          name: "Detalhe",
          ready: false,
          render: function (done) {
            return e(Choices, { ask: "Quem é a professora?", options: ["Lia", "Ana", "Luis"], answer: 1, why: "Her name is Ana.", onDone: done });
          },
        },
        {
          name: "Levar",
          render: function () {
            return e("h1", { style: { fontSize: "36px", fontWeight: 500 } }, "I am from Brasília.");
          },
        },
      ],
    });
  }

  function Writing() {
    var valueState = useState("");
    var value = valueState[0];
    var setValue = valueState[1];
    var checkedState = useState(null);
    var checked = checkedState[0];
    var setChecked = checkedState[1];
    var got = norm(value);
    var ok = got.indexOf("i am") !== -1 && got.indexOf("from") !== -1;
    return e(SimpleLesson, {
      id: "w-two",
      pillar: "Writing",
      title: "Duas frases suas",
      keep: "I am from Brasília.",
      steps: [
        {
          name: "Escrever",
          ready: false,
          render: function (done) {
            return e("div", null,
              e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Player de writing"),
              e("h1", { style: { fontSize: "30px", fontWeight: 500 } }, "Escreva duas frases: o seu nome com I am, e a sua cidade com I am from."),
              e("textarea", { value: value, rows: 5, onChange: function (event) { setValue(event.target.value); setChecked(null); }, style: Object.assign({ width: "100%", marginTop: "12px", borderRadius: "16px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", padding: "12px", fontSize: "18px" }, sans) }),
              checked === null
                ? button("Conferir", function () { setChecked(ok); done(); }, !value.trim(), false)
                : e("p", { style: Object.assign({ color: muted }, sans) }, ok ? "As duas ideias estão aí." : "Modelo: I am Luis. I am from Brasília.")
            );
          },
        },
        {
          name: "Levar",
          render: function () {
            return e("div", null, e("h1", { style: { fontSize: "32px", fontWeight: 500 } }, "I am from Brasília."), e("p", { style: Object.assign({ color: muted }, sans) }, "I am Luis. I am from Brasília."));
          },
        },
      ],
    });
  }

  function Home() {
    var tick = useState(0);
    var setTick = tick[1];
    useEffect(function () {
      function onHash() { setTick(function (n) { return n + 1; }); }
      window.addEventListener("hashchange", onHash);
      return function () { window.removeEventListener("hashchange", onHash); };
    }, []);
    var progress = readProgress();
    var next = LESSONS[0];
    for (var i = 0; i < LESSONS.length; i += 1) {
      if (!progress.done[LESSONS[i].id]) {
        next = LESSONS[i];
        break;
      }
    }
    return e("div", { style: page },
      e("div", { style: { maxWidth: "32rem", margin: "0 auto", padding: "32px 20px 48px" } },
        e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Fluency"),
        e("h1", { style: { fontSize: "40px", lineHeight: 1.1, fontWeight: 500, margin: "8px 0 0" } }, "Um dia, um pilar."),
        e("p", { style: Object.assign({ color: muted, lineHeight: 1.5, maxWidth: "22rem" }, sans) }, "Gramática, listening e speaking não dividem a mesma tela. O player muda com a habilidade."),
        e("a", { href: "#/aula/" + next.id, style: { display: "block", marginTop: "28px", padding: "20px", borderRadius: "24px", border: "1px solid " + line, background: "#1c1915", color: "#f4efe6", textDecoration: "none" } },
          e("p", { style: Object.assign({ color: copper, margin: 0 }, sans) }, "Aula de hoje · " + next.pillar),
          e("h2", { style: { fontSize: "32px", fontWeight: 500, margin: "8px 0 0" } }, next.title),
          e("p", { style: Object.assign({ color: muted }, sans) }, next.minutes + " min · player de " + next.pillar.toLowerCase()),
          e("p", { style: Object.assign({ marginTop: "12px", lineHeight: 1.5 }, sans) }, progress.done[next.id] ? progress.done[next.id].line : next.focus),
          e("span", { style: Object.assign({ display: "inline-flex", marginTop: "16px", height: "48px", alignItems: "center", padding: "0 18px", borderRadius: "999px", background: copper, color: ink, fontWeight: 600 }, sans) }, "Abrir o player")
        ),
        e("h2", { style: Object.assign({ marginTop: "36px", color: muted, fontSize: "14px", letterSpacing: ".04em" }, sans) }, "A SEMANA"),
        e("ol", { style: { listStyle: "none", padding: 0, margin: "8px 0 0" } }, LESSONS.map(function (lesson, index) {
          var done = progress.done[lesson.id];
          var open = index === 0 || progress.done[LESSONS[index - 1].id] || done;
          var row = e("span", { style: { display: "flex", gap: "12px", alignItems: "center", padding: "14px 0", borderTop: "1px solid " + line, opacity: open ? 1 : 0.55 } },
            e("span", { style: Object.assign({ width: "44px", height: "44px", borderRadius: "999px", border: "1px solid " + line, display: "grid", placeItems: "center" }, sans) }, done ? "✓" : String(index + 1)),
            e("span", null,
              e("span", { style: Object.assign({ display: "block", color: copper, fontSize: "14px" }, sans) }, lesson.pillar),
              e("span", { style: Object.assign({ display: "block" }, sans) }, lesson.title)
            )
          );
          return e("li", { key: lesson.id }, open ? e("a", { href: "#/aula/" + lesson.id, style: { color: "inherit", textDecoration: "none" } }, row) : row);
        })),
        e("button", { type: "button", onClick: function () { localStorage.removeItem(KEY); setTick(function (n) { return n + 1; }); }, style: Object.assign({ marginTop: "24px", background: "transparent", color: muted, border: 0, textDecoration: "underline" }, sans) }, "Recomeçar a semana")
      )
    );
  }

  function App() {
    var hashState = useState(location.hash || "#/");
    var hash = hashState[0];
    var setHash = hashState[1];
    useEffect(function () {
      function onHash() { setHash(location.hash || "#/"); window.scrollTo(0, 0); }
      window.addEventListener("hashchange", onHash);
      return function () { window.removeEventListener("hashchange", onHash); };
    }, []);
    var id = (hash.split("/aula/")[1] || "").split("?")[0];
    if (id === "g-to-be") return e(Grammar);
    if (id === "l-names") return e(Listening);
    if (id === "s-hello") return e(Speaking);
    if (id === "v-greet") return e(Vocabulary);
    if (id === "r-profile") return e(Reading);
    if (id === "w-two") return e(Writing);
    return e(Home);
  }

  window.__AppComponent = App;
})();
