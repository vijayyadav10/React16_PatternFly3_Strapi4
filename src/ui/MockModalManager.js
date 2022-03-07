import { Button } from 'patternfly-react/dist/js/components/Button'
import { FormGroup } from 'patternfly-react/dist/js/components/Form'
import { Col, Row } from 'patternfly-react/dist/js/components/Grid'
import { Icon } from 'patternfly-react/dist/js/components/Icon'
import { Modal } from 'patternfly-react/dist/js/components/Modal'
import React, { Component } from 'react'
import { fetchContents, filterContentsByName, getCollectionTypes } from '../api/Api'
import { MockClientPaginationTable } from '../MockClientPaginationTable'
import { TableBuilder } from '../helper/Helper'
import './MockModalManager.css'
import ExpandCollapse from './ExpandCollapse'

export default class MockModalManager extends Component {
    constructor(props) {
        super(props);
        this.state = { show: false, collectionTypes: [], mockRows: [], selectedContent: [], selectedCollectionType: null };
    }

    // TODO: mockRows
    runOnFilterData = async (contentName) => {
        await filterContentsByName(this.state.selectedCollectionType, contentName).then(response => {
            const arr = response.data.data.map(el => {
                el.attributes.id = el.id
                return el.attributes
            })
            this.setState({ mockRows: arr });
        });
    }

    componentDidMount = () => {
    }

    close = () => {
        this.setState({ show: false })
    }

    open = async () => {
        this.setState({ show: true })

        let contentTypes = await getCollectionTypes();
        contentTypes = contentTypes.data.data.filter(obj => {
            return obj && (obj.uid && obj.uid.startsWith("api::")) && obj.isDisplayed;
        });
        // console.log(contentTypes)
        const contentTypeRefine = [];
        contentTypes.length && contentTypes.forEach(element => {
            contentTypeRefine.push(element.info)
        });
        this.setState({ collectionTypes: contentTypeRefine })
    }

    collectionTypeOnChange = (e) => {
        e.persist()
        this.state.collectionTypes.forEach(async (el) => {
            if (el.singularName === e.target.value && e.target.value) {
                this.setState({ selectedCollectionType: el.pluralName })
                await fetchContents(el.pluralName).then(response => {
                    // console.log("HJEUK", response.data.data)

                    const arr = response.data.data.map(el => {
                        el.attributes.id = el.id
                        return el.attributes
                    })

                    this.setState({ mockRows: arr });
                });
            }
            // console.log(el)
        })
    }

    render() {
        return (
            <>
                <button
                    type="submit"
                    value="Submit"
                    className="btn btn-primary pull-right" onClick={this.open}>
                    Add existing content
                </button>

                <Modal style={{ minWidth: "72vw" }} show={this.state.show} onHide={this.close}>
                    <Modal.Header>
                        <button
                            className="close"
                            onClick={this.close}
                            aria-hidden="true"
                            aria-label="Close"
                        >
                            <Icon type="pf" name="close" />
                        </button>
                        <Modal.Title>Select Content</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div
                            className="CollapsibleSection__title no-padding"
                            // onClick={onClick}
                            // onKeyDown={handleKeyDown}
                            role="button"
                            tabIndex={0}
                        >
                            {/* {<span>{name}</span> || (
                                <FormattedMessage id={nameId} defaultMessage="Info" />
                            )} */}
                            
                        </div>
                        <Row>
                            <label className="control-label col-xs-3" htmlFor="group">
                                {/* <FormattedMessage id="user.authority.groups" /> */}Collection Type
                            </label>
                            <Col xs={9}>
                                <select
                                    className="form-control"
                                    name="group"
                                    data-testid={"TEST_ID_USER_AUTHORITY_MODAL.GROUP_FIELD"}
                                    onChange={this.collectionTypeOnChange}
                                >
                                    <option value={0}>Select Collection Type</option>
                                    {
                                        this.state.collectionTypes.length && this.state.collectionTypes.map((collectionType, idx) => {
                                            // console.log(collectionType)
                                            return (
                                                <option key={collectionType.singularName} value={collectionType.singularName}>{collectionType.pluralName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </Col>
                        </Row>

                        <ExpandCollapse runOnFilterData={this.runOnFilterData}/>

                        {/* </FormGroup> */}
                        <MockClientPaginationTable
                            onRowsLogger={function noRefCheck() { }}
                            mockRows={this.state.mockRows}
                            setSelectedContent={this.props.setSelectedContent}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            bsStyle="default"
                            className="btn-cancel"
                            onClick={this.close}
                        >
                            Cancel
                        </Button>
                        <Button bsStyle="primary" onClick={this.close}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
