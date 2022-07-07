import { computed } from "@vue/reactivity";
import { ref } from "vue";
import confetti from "canvas-confetti";

interface Problem {
  num1: number;
  num2: number;
  res: number | null;
}

const generateTables = () => {
  const tables: Problem[] = [];
  for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
      tables.push({
        num1: i,
        num2: j,
        res: null,
      });
    }
  }
  return tables.sort(() => (Math.random() > 0.5 ? 1 : -1));
};

const confettiOrBuu = (isOk: boolean) => {
  if (isOk) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 1 },
    });
  } else {
    const audio = new Audio("../../assets/buu.mp3");
    audio.play();
  }
};

const fireworks = () => {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

export const getGame = () => {
  const tables = ref(generateTables());
  const solvedtables = ref<Problem[]>([]);
  const response = ref<number | null>(null);

  const invertedSolvedTables = computed(() => solvedtables.value.reverse());

  const evaluate = (problem: Problem, res: number | null) => {
    if (res === null) return;
    solvedtables.value.unshift({
      ...problem,
      res,
    });
    confettiOrBuu(problem.num1 * problem.num2 === res);
    tables.value.splice(0, 1);
    if (!tables.value.length) fireworks();
    response.value = null;
  };

  return {
    tables,
    solvedtables,
    res: response,
    evaluate,
    invertedSolvedTables,
  };
};
