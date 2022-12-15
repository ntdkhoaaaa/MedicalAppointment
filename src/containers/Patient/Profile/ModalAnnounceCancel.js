import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils';
import { Modal } from 'reactstrap';

class ModalAnnounceCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {

        }
    }
    render() {
        let { isOpenModalAnnounce, CancelSuccess, closeAnnouncementModal } = this.props
        return (
            <Modal
                isOpen={isOpenModalAnnounce}
                centered={true}
                toggle={closeAnnouncementModal}>
                <div>
                    <img src='https://phongthuy365.vn/wp-content/uploads/2021/03/loi-cam-on-luon-mang-gia-tri-va-y-nghia-thiet-thuc-trong-cuoc-song-cam-on-e1616921069665.jpg' />
                    Bạn không thể hủy hẹn vì thời gian cuộc hẹn cách 24 tiếng
                </div>

            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalAnnounceCancel);
