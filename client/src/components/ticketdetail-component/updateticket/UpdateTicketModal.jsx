import React, { Component } from "react";
import { updateTicket } from "../../../store/actions/ticketsActions";
import { clearErrors } from "../../../store/actions/errorActions";
import { connect } from "react-redux";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";
export class UpdateTicketModal extends Component {
  state = {
    modal: false,
    summary: this.props.summary,
    status: this.props.status,
    msg: null,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      //Check for login error
      console.log(error.msg.msg);
      if (error.id === "UPDATE_TICKET_FAIL") {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
  }
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal,
    });
  };
  onChange = (e) => {
    if (e.target.value !== "Select Option") {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { summary, status } = this.state;

    // Create usre object
    const updatedTicket = {
      summary,

      status,
    };
    this.props.updateTicket(updatedTicket);
    if (summary === "" || status === "") {
      console.log("Error");
    } else {
      this.toggle();
    }
  };
  render() {
    return (
      <div>
        <Button onClick={this.toggle} className="bg-success border-success">
          Update Ticket
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Update Ticket</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label className="mt-3">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  defaultValue={this.props.status}
                  className="mb-3"
                  onChange={this.onChange}
                >
                  <option>Select Option</option>
                  <option>In progress</option>
                  <option>Closed</option>
                  <option>Reopened</option>
                  <option>Cancelled</option>
                </Input>
                {this.state.msg ? (
                  <Alert color="danger" className="mt-3">
                    {this.state.msg}
                  </Alert>
                ) : null}
                <Button color="dark" block style={{ marginTop: "2rem" }}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  error: state.error,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  updateTicket,
  clearErrors,
})(UpdateTicketModal);
