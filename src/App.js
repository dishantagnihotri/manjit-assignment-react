import "antd/dist/antd.css";

import { Route, Switch } from "react-router-dom";
import { routes } from "helpers";

const App = () => {
  return (
    <div className="App">
      <Switch>
        {routes.map((route, key) => (
          <Route key={`routes-${key}`} {...route} />
        ))}
      </Switch>
    </div>
  );
};

export default App;
