function fakeDataAreaChart() {
  const result = [];

  let nextTodoValue = Math.random() * 5;
  let nextDoneValue = Math.random() * 5;

  for (let i = 1; i <= 209; i++) {
    result.push({
      date: new Date(2016, 3, i * 1),
      backlog: Math.floor(nextTodoValue),
      todo: Math.floor(nextTodoValue),
      done: Math.floor(nextDoneValue),
    });

    const incrementValue = Math.random() > 0.3 ? Math.random() * 10 + 3 : 0;

    if (nextTodoValue > 300) {
      Math.random() > 0.5 ? nextTodoValue += incrementValue : nextTodoValue -= incrementValue;
    } else {
      nextTodoValue += incrementValue;
    }

    if (nextDoneValue > 300) {
      Math.random() > 0.5 ? nextDoneValue += incrementValue : nextDoneValue -= incrementValue;
    } else {
      nextDoneValue += incrementValue;
    }
  }
  return result;
}

module.exports = fakeDataAreaChart;
