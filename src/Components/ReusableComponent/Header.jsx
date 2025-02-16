import React, { useContext } from "react";
import { RxDashboard } from "react-icons/rx";
import { MdBarChart } from "react-icons/md";
import { BsBoxSeam, BsClipboard2Data } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import CommonContext from "../StateManagment/CommonContext";
import { IoLogoTableau } from "react-icons/io5";

const Header = () => {
  const {
    setSelectedTab,
    selectedTab,
    portfolioData,
    getPortFolioToken,
    diveDeepData,
    getDiveDeepToken,
    analysisData,
    getAnalysisToken,
    piesData,
    getPieAcreToken,
  } = useContext(CommonContext);

  const handleLogout = () => {
    localStorage.removeItem("initialToken");
    localStorage.removeItem("portfolioToken");
    localStorage.removeItem("diveDeepToken");
    localStorage.removeItem("analysisToken");
    localStorage.removeItem("pieAcreToken");
  };

  const handlePortfolio = () => {
    getPortFolioToken(portfolioData.group_id, portfolioData.report_id);
  };
  const handleDiveDeep = () => {
    getDiveDeepToken(diveDeepData.group_id, diveDeepData.report_id);
  };
  const handleAnalysis = () => {
    getAnalysisToken(analysisData.group_id, analysisData.report_id);
  };

  const handlePies = () => {
    getPieAcreToken(piesData.group_id, piesData.report_id);
  };

  const handleMatsuriAi = () => {
    setSelectedTab("Matsuri Ai");
  };

  return (
    <div className="header-component">
      <nav className="navbar navbar-expand-lg navbar-light bg-light header-nav-tag py-2 ">
        <div className="container-fluid px-3">
          <a className="navbar-brand" href="#">
            {selectedTab}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <img
            src={require("../Images/cbre_logo.png")}
            alt="cbre-logo"
            className="cbre-header-logo  me-0 mt-2"
          />

          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row">
            <div className="container px-4">
              <ul className="nav align-content-start nav_list p-0">
                <li className="col-12">
                  <NavLink
                    to={"/home/portfolio"}
                    className="nav-link rounded"
                    onClick={handlePortfolio}
                  >
                    <span className="pe-4 ">
                      <RxDashboard className="fs-5" />
                    </span>
                    Portfolio
                  </NavLink>
                </li>
                <li className="col-12">
                  <NavLink
                    to={"/home/dive-deep"}
                    className="nav-link rounded"
                    onClick={handleDiveDeep}
                  >
                    <span className="pe-4">
                      <BsBoxSeam className="fs-5" />
                    </span>
                    Dive deep
                  </NavLink>
                </li>
                <li className="col-12">
                  <NavLink
                    to={"/home/analysis"}
                    className="nav-link rounded"
                    onClick={handleAnalysis}
                  >
                    <span className="pe-4">
                      <MdBarChart className="fs-5" />
                    </span>
                    Analysis
                  </NavLink>
                </li>
                <li className="col-12">
                  <NavLink
                    to={"/home/pies"}
                    className="nav-link rounded"
                    onClick={handlePies}
                  >
                    <span className="pe-4">
                      <BsClipboard2Data className="fs-5" />
                    </span>
                    PIES
                  </NavLink>
                </li>
                <li className="col-12">
                  <NavLink
                    to={"/home/matsuri-ai"}
                    className="nav-link rounded"
                    onClick={handleMatsuriAi}
                  >
                    <span className="pe-4">
                      <IoLogoTableau className="fs-5" />
                    </span>
                    Matsuri AI
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="offcanvas-footer">
          <div className="logout-container text-center ">
            <div className="container px-4">
              <NavLink
                to="/"
                className="btn btn-danger w-100"
                onClick={handleLogout}
              >
                <span className="pe-4">
                  <RiLogoutBoxLine className="fs-5" />
                </span>
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
