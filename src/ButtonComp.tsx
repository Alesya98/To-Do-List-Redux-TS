
// export type FilterType = 'active' | 'done' | 'all'

// type ButtonCompType = {
//     setFilter: (filter: FilterType) => void;
// }


// export const ButtonComp = ({ setFilter }:ButtonCompType) => {
//     return <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
//         <button className="search-btn"  onClick={() => setFilter('active')}>Активные</button>
// <button className="search-btn" onClick={() => setFilter('done')}>Готовые</button>
// <button className="search-btn" onClick={() => setFilter('all')}>Все</button>
//     </div>
// }

import { useDispatch } from "react-redux";
import { filterTasksActions } from "./redux/action/tasksActions";
import type { AppDispatch } from "./redux/store";

const ButtonComp = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div
      style={{ display: "flex", gap: "20px", justifyContent: "space-between" }}
    >
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("active"))}
      >
        Активные
      </button>
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("done"))}
      >
        Готовые
      </button>
      <button
        className="search-btn"
        onClick={() => dispatch(filterTasksActions("all"))}
      >
        Все
      </button>
    </div>
  );
};

export default ButtonComp;