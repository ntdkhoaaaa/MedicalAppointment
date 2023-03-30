import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';

class TableSpecialtiesClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty:[]
        }
    }
    async componentDidMount() {
        this.setState({
            listSpecialty: this.props.listSpecialty
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        }
    }
    handleEditClinicSpecialty = async (clinic) => {
        await this.props.handleEditClinicSpecialtyFromParentKey(clinic);
    }
    handleDeleteClinicSpecialty = async (clinic) => {
        await this.props.handleDeleteClinicSpecialty(clinic.id);
    }
    render() {
        let { listSpecialty } = this.props
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>English Name</th>
                            <th>Actions</th>
                        </tr>
                        {listSpecialty && listSpecialty.length > 0 && listSpecialty.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.nameEn}</td>
                                    <td>
                                        <button
                                            onClick={() => this.handleEditClinicSpecialty(item)}
                                            className="btn-edit"
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"
                                        //  onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash"
                                                onClick={() => this.handleDeleteClinicSpecialty(item)}
                                            ></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSpecialtiesClinic);
