import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { GrSearch } from "react-icons/gr";

// import $ from 'jquery'
// import "datatables.net-bs5";
// import 'datatables.net-responsive-bs5'
// import 'datatables.net-dt'
// import 'datatables.net-responsive-dt'

import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";
import CommonContext from "../StateManagment/CommonContext";

const MatsuriAi = () => {
  const [searchData, setSearchData] = useState("")
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);
  const [header, setHeader] = useState([]);
  const [values, setValues] = useState([]);
  const { setSelectedTab } = useContext(CommonContext);
  useEffect(() => {
    setSelectedTab("Matsuri AI")
  }, [])



  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      getQueryResult(event.target.value);
    }
  };

  const getQueryResult = async (value) => {   
    if (value) {
      setHeader([])
      setValues([])
      setLoading(true);
      setInitial(true);
      try {
        await axios
          .post("https://cbreapi.matsuritech.com/defog", {
            question: value,
          })
          .then((response) => {
            if (response.data.error_code === 200) {
              setHeader(response.data.data.columns);
              setValues(response.data.data.data);
              setTimeout(() => {
                new DataTable("#example_table", {
                  responsive: true,
                });
                setInitial(false);
                setLoading(false);
                setSearchData('')
              }, 20000);
            }
          })
          .catch((error) => {
            setLoading(false)
            toast.error(error.message);
            if (error.code === "ERR_NETWORK") {
              getQueryResult(value);
            }
          });
      } catch (err) {
        console.log(err.code);
      }
    }
  }

  return (
    <div className="container h-100">
      <div className="matsuriAi-searchBar pt-3">
        <input
          className="form-control fieldBar"
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchData(e.target.value)}
          type="text"
          placeholder="Ask questions about the properties: For example, how many leases are expiring in 2024 - show id, name, and location"
          autoFocus
          value={searchData}
          disabled={loading}
        />

        <span className={`matsuriAi-send-icon ${loading ? 'hide-searchIcon' : ''}`} onClick={() => getQueryResult(searchData)}>
          <GrSearch />
        </span>
      </div>



      {initial ?
        loading ? (
          <div class="d-flex justify-content-center align-items-center h-75">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row align-items-center justify-content-center h-75">
            <h5 className="text-center">
              Your results will be displayed here
            </h5>
          </div>
        )

        : null}

      {header.length > 0 ?
        <div className={`card mt-5 shadow border-0 rounded ${initial ? 'table-visibility overflow-hidden' : 'overflow-auto'}`}>
          <div className="card-body ">
            <table className="table table-bordered mt-2" id="example_table">
              <thead>
                <tr>
                  {header.map((head, index) => {
                    return <th key={index}>{head}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {values.map((val, index) => {
                  return (
                    <tr key={index}>
                      {val.map((colValues, index) => {
                        return <td key={index}>{colValues}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  {header.map((head, index) => {
                    return <th key={index}>{head}</th>;
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        :
        null
      }
      <Toaster />
    </div>
  )
}
export default MatsuriAi;
