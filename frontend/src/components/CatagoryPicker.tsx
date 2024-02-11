import { FormEvent, useEffect, useState } from "react";
import "./CatagoryPicker.css";
import { getTags } from "../services/triviaAPIservice";

interface Props {
  setCatagories: (string: string[]) => void;
}

const CatagoryPicker = ({ setCatagories }: Props) => {
  const [tags, setTages] = useState<string[]>([]);
  const [pickedTags, setPickedTags] = useState<boolean[]>([]);
  useEffect(() => {
    let usedTags: string[] = [];
    getTags().then((res) => {
      for (let item in res) {
        if (res[item] > 500) {
          usedTags.push(item);
        }
      }
      setTages(usedTags);
      setPickedTags(new Array(usedTags.length).fill(false));
      return res;
    });
  }, []);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    let chosen = [];
    for (let i = 0; i < tags.length; i++) {
      if (pickedTags[i]) {
        chosen.push(tags[i]);
      }
    }
    setCatagories(chosen);
  };

  return (
    <div className="CatagoryPicker">
      <form onSubmit={submitHandler}>
        <ul id="catagory-choices">
          {tags.map((tag, i) => (
            <li key={tag}>
              <button
                onClick={() =>
                  setPickedTags((prev) => {
                    let copy = [...prev];
                    copy[i] = !copy[i];
                    return copy;
                  })
                }
                type="button"
                className={pickedTags[i] ? "picked" : ""}
              >
                {tag.split("_").join(" ")}
              </button>
            </li>
          ))}
        </ul>
        <button id="start">Start</button>
      </form>
    </div>
  );
};

export default CatagoryPicker;
