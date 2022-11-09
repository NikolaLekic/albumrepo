import { AppLogo, SelectInput } from "../../Atoms";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
export const Navbar = () => {
  const history = useHistory();
  const { user, albums } = useSelector((state) => ({
    user: state.appState.user,
    albums: state.appState.albums,
  }));
  const logout = () => {
    sessionStorage.clear();
    history.push("/login");
    history.go();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="d-flex flex-grow-1 justify-content-center position-relative">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <AppLogo />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse  nav-items-wrapper"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {user ? (
                <li className="nav-item mx-1">
                  <SelectInput
                    data={albums}
                    dropdownClassName={"nav-link-dark btn btn-primary"}
                    placeholder={"My Albums"}
                    buttonValue={"name"}
                    onClick={(e) => {
                      const id = e.target.id;
                      history.push(`/albums/${id}`);
                    }}
                  />
                </li>
              ) : null}
              {user ? (
                <li className="nav-item mx-1">
                  <button
                    className="nav-link-dark btn btn-primary"
                    aria-current="page"
                    onClick={logout}
                  >
                    Log out
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
