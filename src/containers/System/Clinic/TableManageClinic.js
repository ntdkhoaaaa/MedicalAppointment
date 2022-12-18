import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './TableManageClinic.scss';
import * as actions from "../../../store/actions";
import { async } from 'q';

class TableManageClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listClinic: []
        }
    }
    async componentDidMount() {
        this.setState({
            listClinic: this.props.listClinic
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listClinic !== this.props.listClinic) {
            this.setState({
                listClinic: this.props.listClinic
            })
        }
    }
    handleEditClinic = async (clinic) => {
        await this.props.handleEditClinicFromParentKey(clinic);
    }
    handleDeleteClinic = async (clinic) => {
        await this.props.handleDeleteClinic(clinic.id);
    }
    render() {
        let { listClinic } = this.state

        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>English Name</th>
                            <th>Address</th>
                            <th>English Address</th>
                            <th>Actions</th>
                        </tr>
                        {listClinic && listClinic.length > 0 && listClinic.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.nameEn}</td>
                                    <td>{item.address}</td>
                                    <td>{item.addressEn}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditClinic(item)}
                                            className="btn-edit"
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"
                                        //  onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash"
                                                onClick={() => this.handleDeleteClinic(item)}
                                            ></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /> */}

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allClinics: state.admin.allClinics,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllClinics: () => dispatch(actions.fetchAllClinics())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClinic);
