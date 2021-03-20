import React, { Component } from "react";
import { create } from "./api-province";

export default class AddForm extends Component {
  state = {
    provinceId: null,
    provinceName: "",
  };

  refresh = () => {
    // re-renders the component
    this.setState({});
  };

  componentDidMount() {
    this.setState({
      provinceId: this.props.province.prov_id,
      provinceName: this.props.province.prov_name,
    });
  }

  handleOnChange = (e) => {
    const {
      target: { value, name },
    } = e;
    this.setState({
      [name]: value,
    });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const province = {
      prov_id: this.state.provinceId,
      prov_name: this.state.provinceName,
    };

    create(province)
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // jika ada udah sukses or error then, close modal
    // lalu refresh table
    this.props.setShowModalAdd(false);
    this.props.setRefreshTable(true);
  };

  render() {
    const { provinceId, provinceName } = this.state;

    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                  Add province
                </h6>
                <button
                  onClick={() => this.props.setShowModalAdd(false)}
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={this.handleOnSubmit}>
                  <div className="flex flex-wrap ">
                    <div className="w-full lg:w-full px-4">
                      <div className="relative w-full mb-3">
                        <input
                          disabled
                          type="hidden"
                          name="provinceId"
                          value={provinceId}
                          onChange={this.handleOnChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                    <div className="w-full lg:w-full px-4">
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          province Name
                        </label>
                        <input
                          required
                          type="text"
                          name="provinceName"
                          value={provinceName}
                          onChange={this.handleOnChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                      onClick={() => this.props.setShowModalAdd(false)}
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => this.props.setRefreshTable(true)}
                      className="bg-gray-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  }
}
