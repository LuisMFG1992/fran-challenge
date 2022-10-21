const Input = ({ name, paramsHandler = "", id, options = [], placeholder }) => {
  let inputType = "";
  let inputValue;

  //TODO: Usar el debouce para que el input number no me tome el valor con cada tecla

  if (options.length <= 2) {
    const min = options[0];
    const max = options[1];

    inputType = (
      <input
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
        type="number"
        min={min ? min : "-100"}
        max={max ? max : "100"}
        placeholder={placeholder ? placeholder : " From -100 to 100"}
        //TODO: Hacer debounce para que no me cree un objeto con cada numero que escribo
        onChange={(e) => {
          inputValue = e.target.value;
          paramsHandler(id, inputValue);
        }}
      />
    );
  } else {
    inputType = (
      <select
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-center"
        onChange={(e) => {
          inputValue = e.target.value;
          paramsHandler(id, inputValue);
        }}
      >
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <>
      <label
        htmlFor={id}
        className="block m-1 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        {name}
      </label>

      {inputType}
    </>
  );
};

export default Input;
