import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import './TableManageSpecialty.scss';
import * as actions from "../../../store/actions";
import { async } from 'q';

class TableManageSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSpecialty: []
        }
    }
    async componentDidMount() {
        this.setState({
            listSpecialty: this.props.listSpecialty
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listSpecialty !== this.props.listSpecialty) {
            this.setState({
                listSpecialty: this.props.listSpecialty
            })
        }
    }
    handleEditSpecialty = async (specialty) => {
        await this.props.handleEditSpecialtyFromParentKey(specialty);
    }
    handleDeleteSpecialty = async (specialty) => {
        await this.props.handleDeleteSpecialty(specialty.id);
    }
    render() {
        let { listSpecialty } = this.state

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
                                            onClick={() => this.handleEditSpecialty(item)}
                                            className="btn-edit"
                                        ><i className="fas fa-pencil-alt"></i></button>
                                        <button className="btn-delete"
                                        //  onClick={() => this.handleDeleteUser(item)}
                                        >
                                            <i className="fas fa-trash"
                                                onClick={() => this.handleDeleteSpecialty(item)}
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
        allSpecialties: state.admin.allSpecialties,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadAllSpeciatltys: () => dispatch(actions.fetchAllSpecialties())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageSpecialty);
