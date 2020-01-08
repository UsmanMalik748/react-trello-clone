import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }

  function addChecklist(){
		alert("here");
	}

  return {
    isShowing,
    toggle,
    addChecklist,
  }
};

export default useModal;