import { useState } from "react";

// BUG: Directly mutating state instead of using setter
export default function DirectStateMutation() {
  const [user, setUser] = useState({ name: "Alice", age: 30 });
  const [tags, setTags] = useState(["react", "javascript"]);

  const birthdayMutate = () => {
    // Direct mutation — won't trigger re-render reliably
    user.age += 1;
    setUser(user); // same reference, React may bail out
  };

  const addTagMutate = () => {
    // Direct mutation of array state
    tags.push("new-tag-" + tags.length);
    setTags(tags); // same reference
  };

  const fixedBirthday = () => {
    setUser({ ...user, age: user.age + 1 });
  };

  return (
    <div>
      <h2>Direct State Mutation</h2>
      <p>
        {user.name}, age {user.age}
      </p>
      <p>Tags: {tags.join(", ")}</p>
      <button onClick={birthdayMutate}>Birthday (mutated)</button>
      <button onClick={addTagMutate}>Add Tag (mutated)</button>
      <button onClick={fixedBirthday}>Birthday (correct)</button>
    </div>
  );
}
