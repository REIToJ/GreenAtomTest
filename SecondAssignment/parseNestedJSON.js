/**
 * Функция для преобразования вложенного JSON-объекта в плоскую структуру.
 * @param {Object} obj - исходный JSON-объект
 * @param {string} parentKey - текущий путь (используется при рекурсии)
 * @param {Object} result - результирующий объект
 * @returns {Object} - объект с плоской структурой
 */
function parseNestedJSON(obj, parentKey = "", result = {}) {
  // Если не объект или null, возвращаем как есть
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  // Перебираем все ключи объекта
  for (let key in obj) {
    // Пропускаем унаследованные свойства
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    // Формируем новый ключ (учитывая предыдущий путь)
    let newKey;
    if (parentKey) {
      newKey = parentKey + "." + key;
    } else {
      newKey = key;
    }

    const value = obj[key];
    // Если значение - объект
    if (typeof value === "object" && value !== null) {
      // И если это массив
      if (Array.isArray(value)) {
        // Перебираем элементы массива
        value.forEach(function (item, index) {
          let arrayKey = newKey + "." + index;
          if (typeof item === "object" && item !== null) {
            // Рекурсивно обрабатываем элемент массива
            parseNestedJSON(item, arrayKey, result);
          } else {
            // Записываем примитив в результат
            result[arrayKey] = item;
          }
        });
      } else {
        // Рекурсивно обрабатываем вложенный объект
        parseNestedJSON(value, newKey, result);
      }
    } else {
      // Если значение примитивное, сразу добавляем в результат
      result[newKey] = value;
    }
  }
  return result;
}

//Пример ввода:
const input1 = {
  a: {
    b: {
      c: 42,
    },
    d: [1, 2],
  },
};
const result = parseNestedJSON(input1);
console.log(JSON.stringify(result, null, 2));

/* Ожидаемый результат:
  {
    'a.b.c': 42,
    'a.d.0': 1,
    'a.d.1': 2,
  }
  */
