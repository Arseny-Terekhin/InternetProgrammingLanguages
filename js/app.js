let timer;

document.getElementById("userForm").addEventListener("submit", function(event) {
  event.preventDefault(); // чтобы страница не перезагружалась

  const name = document.getElementById("name").value.trim();
  const age = Number(document.getElementById("age").value);
  const result = document.getElementById("result");

  if (name === "") {
    result.textContent = "Ошибка: введите имя";
    cleanMessage(result)
    return;
  }

  if (age == "" || isNaN(age) || age <= 0) {
    result.textContent = "Ошибка: возраст должен быть числом больше 0";
    cleanMessage(result)
    return;
  }

  if (age === "" || isNaN(age) || age <= 0) {
    result.textContent = "Ошибка: возраст должен быть числом больше 0";
  } else if (ageNumber <= 65) {
    result.textContent = `Привет, ${name}! Доступ разрешен`;
  }else if (ageNumber < 18) {
    result.textContent = `Привет, ${name}! Доступ ограничен`;
  }else {
    result.textContent = `Привет, ${name}! Рекомендуется упрощенный режим`;
  }
  cleanMessage(result)

});

function cleanMessage(element, delay = 3000) {
  clearTimeout(timer); // сброс предыдущего таймера
  timer = setTimeout(() => {
    element.textContent = "";
  }, delay);
}
