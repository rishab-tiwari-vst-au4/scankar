import React from 'react';
import MenuFormContainer from '../MenuFormContainer/MenuFormContainer';
import OrderTotal from '../OrderTotal/OrderTotal';
import AddItemNotification from '../AddItemNotification/AddItemNotification';
import SpecialInstructions from '../SpecialInstructions/SpecialInstructions';
// import Footer from '../../DashboardView/Footer/Footer';
import { Link } from 'react-router';
import '../../App/app.scss';
import './custom-order-view.scss';
import cookie from 'js-cookie';
import data from "../../../../dummy-data.json";

var CustomOrderView = React.createClass({

    // propTypes: {
    //     notification: React.PropTypes.shape({
    //         add: React.PropTypes.bool,
    //         delete: React.PropTypes.bool,
    //         error: React.PropTypes.bool
    //     }),
    //     data: React.PropTypes.object,
    //     items: React.PropTypes.array,
    //     handleSpecialInstructions: React.PropTypes.func,
    //     handleAddItemToOrder: React.PropTypes.func,
    //     handleDeleteItemFromOrder: React.PropTypes.func,
    //     toggleAddNotification: React.PropTypes.func,
    //     toggleDeleteNotification: React.PropTypes.func,
    //     toggleErrorNotification: React.PropTypes.func,
    //     toggleFormNotification: React.PropTypes.func,
    // },
    getInitialState: function () {
        return {
            username: '',
            userLocation: {
                lat: '',
                lng: ''
            },
            shops: [],
            selectedShop: {},
            selectedShopLocation: {
                lat: '',
                lng: ''
            },
            distance: '',
            duration: '',
            durationSeconds: undefined,
            items: [],
            specialInstructions: '',
            notification: {
                add: false,
                delete: false,
                error: false,
                form: false,
                additionalInfo: false,
                userLocation: false
            },
            methodOfTrans: '',
            methodOfTransShow: true,
            pickupTime: true,
            expectedPickupTime: '',
            favorite: false,
            paymentInfo: {
                nameOnCard: '',
                cardNumber: undefined,
                expMonth: '',
                expYear: '',
                cvv: undefined
            },
            previousOrders: [],
            favoriteOrders: [],
            menuShow: false,
        }
    },

    componentWillMount(){
        let userName = cookie.get("username") ? cookie.get("username") : "Guest" ;

        // console.log("username--->" , JSON.parse(cookie.get("dining")))

        if(!cookie.get("seatNumber")){
            cookie.set("seatNumber" , 0)
        }

        this.setState({
            username:userName
        })

    },
    toggleFormNotification: function () {
        this.setState({
            notification: {
                form: true
            }
        });
        var clearNotification = () => {
            this.setState({
                notification: {
                    form: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },
    handleSpecialInstructions: function (event) {
        this.setState({
            specialInstructions: event.target.value
        })
    },

    handleAddItemToOrder: function (itemDetails) {
        this.setState({
            items: this.state.items.concat(itemDetails),
        });
    },

    toggleAddNotification: function () {
        this.setState({
            notification: {
                add: true
            }
        });
        var clearNotification = () => {
            this.setState({
                notification: {
                    add: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    toggleErrorNotification: function () {
        this.setState({
            notification: {
                error: true
            }
        });
        var clearNotification = () => {
            this.setState({
                notification: {
                    error: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    handleDeleteItemFromOrder: function (index) {
        var items = this.state.items;
        items.splice(index, 1);
        this.setState({
            items: items
        })
    },

    toggleDeleteNotification: function () {
        this.setState({
            notification: {
                delete: true
            }
        });
        var clearNotification = () => {
            this.setState({
                notification: {
                    delete: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },
    _handleSpecialInstructions: function (event) {
        this.setState({
            specialInstructions: event.target.value
        })
    },





    render: function() {

        var nextButton;
        
        if (this.state.items.length > 0) {
            nextButton = <Link to={{pathname:"/additional-info", state: { items: this.state.items }}} >
                            <button className="next-button">
                                Next
                                <i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i>
                            </button>
                        </Link>
        } else {
            nextButton = <button
                            onClick={this.toggleFormNotification}
                            className="next-button">
                            Next
                            <i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i>
                        </button>
        }

        return (
            <div className="custom-order-container">
                <div className="title-cover">
                    <h1>Place Your Order</h1>
                    <div className="userProgress">
                        <div id="twoOfFive"></div>
                    </div>
                </div>
                <div className="custom-order-view-wrap">
                    <AddItemNotification
                    notification={this.state.notification} />
                    <div className="menu-form-container">
                            <MenuFormContainer
                                data={data}
                                handleSpecialInstructions={this.handleSpecialInstructions}
                                handleAddItemToOrder={this.handleAddItemToOrder}
                                toggleAddNotification={this.toggleAddNotification}
                                toggleErrorNotification={this.toggleErrorNotification} />

                    </div>
                    <div className="order-total-container">
                         <OrderTotal
                             orderItems={this.state.items}
                             handleDeleteItemFromOrder={this.handleDeleteItemFromOrder}
                             toggleDeleteNotification={this.toggleDeleteNotification} />
                             <SpecialInstructions
                                handleSpecialInstructions={this.handleSpecialInstructions} />
                            {nextButton}
                    </div>
                 </div>
                 {/* <Footer /> */}
             </div>
        )
    }
});

export default CustomOrderView;
