import React from "react";
import { ReactComponent as MinusIcon } from "../../../../assets/icons/X.svg";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/plus-icon.svg";

const QuestionInput = ({ modalData, updateModalState }) => {
  const { text = "", options = [{ text: "", isCorrect: false, option: "A" }] } = modalData;

  const handleQuestionChange = (value) => {
    updateModalState("text", value);
  };

  const handleOptionChange = (optionIndex, value) => {
    const updatedOptions = [...options];
    updatedOptions[optionIndex].text = value;
    updateModalState("options", updatedOptions);
  };

  const handleIsCorrectChange = (optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions.forEach((option, idx) => {
      option.isCorrect = idx === optionIndex;
    });
    updateModalState("options", updatedOptions);
  };

  const addOption = () => {
    const updatedOptions = [...options];
    const optionIndex = updatedOptions.length;
    const optionLetter = getOptionLetter(optionIndex);
    updatedOptions.push({
      text: "",
      isCorrect: false,
      option: optionLetter,
    });
    updateModalState("options", updatedOptions);
  };

  const removeOption = (optionIndex) => {
    const updatedOptions = [...options];
    updatedOptions.splice(optionIndex, 1);
    // Update option letters after removing an option
    updatedOptions.forEach((option, idx) => {
      option.option = getOptionLetter(idx);
    });
    updateModalState("options", updatedOptions);
  };

  const getOptionLetter = (index) => {
    const letters = ["A", "B", "C", "D", "E", "F"];
    return letters[index] || String.fromCharCode(65 + index);
  };

  return (
    <div className="question-modal">
      <input
        className="question-input"
        type="text"
        placeholder="Sual daxil edin"
        value={text}
        onChange={(e) => handleQuestionChange(e.target.value)}
      />
      {options.map((option, optionIndex) => (
        <div key={optionIndex} className="answer-container">
          <div className="answer-correct">
            <input
              type="radio"
              name="correct-option"
              checked={option.isCorrect}
              onChange={() => handleIsCorrectChange(optionIndex)}
            />
            <input
              className="answer-input"
              type="text"
              placeholder={`Cavab ${option.option}`}
              value={option.text}
              onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
            />
          </div>

          <div className="question-btns">
            <button
              className="delete-answer"
              type="button"
              onClick={() => removeOption(optionIndex)}
            >
              <MinusIcon />
            </button>
            <button
              type="button"
              className="add-answer-btn"
              onClick={addOption}
            >
              <PlusIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionInput;
