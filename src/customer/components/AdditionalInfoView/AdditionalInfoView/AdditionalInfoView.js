import React from 'react';
import { Link } from 'react-router';
import SelectMethodOfTrans from '../SelectMethodOfTrans/SelectMethodOfTrans';
import SelectPickUpTime from '../SelectPickUpTime/SelectPickUpTime';
import SelectIfFavorite from '../SelectIfFavorite/SelectIfFavorite';
import EnterPaymentInfo from '../EnterPaymentInfo/EnterPaymentInfo';
import AdditionalInfoNotification from '../AdditionalInfoNotification/AdditionalInfoNotification';
// import Footer from '../../DashboardView/Footer/Footer';
import '../../App/app.scss';
import './additional-info-view.scss';
import request from 'superagent';
import _ from 'lodash';

var AdditionalInfoView = React.createClass({

    // propTypes: {
    //     handleMethodOfTrans: React.PropTypes.func,
    //     handlePickupTime: React.PropTypes.func,
    //     pickupTime: React.PropTypes.oneOfType([
    //         React.PropTypes.string,
    //         React.PropTypes.bool
    //     ]),
    //     handleFavorite: React.PropTypes.func,
    //     favorite: React.PropTypes.bool,
    //     handleCCName: React.PropTypes.func,
    //     handleCCNumber: React.PropTypes.func,
    //     handleCCExpMonth: React.PropTypes.func,
    //     expMonth: React.PropTypes.string,
    //     handleCCExpYear: React.PropTypes.func,
    //     expYear: React.PropTypes.string,
    //     handleCCCVV: React.PropTypes.func,
    //     toggleAdditionalInfoNotification: React.PropTypes.func,
    //     methodOfTrans: React.PropTypes.string,
    //     methodOfTransShow: React.PropTypes.bool
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

    toggleAdditionalInfoNotification: function () {
        this.setState({
            notification: {
                additionalInfo: true
            }
        });
        var clearNotification = () => {
            this.setState({
                notification: {
                    additionalInfo: false
                }
            })
        };
        setTimeout(clearNotification, 3000);
    },

    handlePickupTime: function (newValue) {
        this.setState({
            pickupTime: newValue
        })
        if (newValue === true) {
            this.setState({
                methodOfTransShow: true
            })
        } else if (newValue !== true) {
            this.setState({
                methodOfTransShow: false
            })
        }
    },

    handleMethodOfTrans: function (event) {
        this.setState({
            methodOfTrans: event.target.value
        })
        // api.calculateTravelTime(
        //     this.state.userLocation,
        //     this.state.selectedShopLocation,
        //     this.state.methodOfTrans,
        //     this._handleDistanceAndDuration
        // );
    },

    handleFavoriteOrders: function () {
        request.get('/api/users/' + String(this.state.username) + '/orders/favorites')
            .end((err, res) => {
                this.setState({
                    favoriteOrders: res.body
                })
            });
    },
    handleCCName: function (event) {
        var newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            { nameOnCard: event.target.value }
        )
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    handleCCNumber: function (event) {
        var newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            { cardNumber: event.target.value }
        )
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    handleCCExpMonth: function (event) {
        var newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            { expMonth: event.target.value }
        )
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    handleCCExpYear: function (event) {
        var newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            { expYear: event.target.value }
        )
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    handleCCCVV: function (event) {
        var newPaymentInfo = _.assign(
            {},
            this.state.paymentInfo,
            { cvv: event.target.value }
        )
        this.setState({
            paymentInfo: newPaymentInfo
        })
    },

    render: function() {

        console.log("addad" , this.props)

        var nextButton;
        if (this.state.pickupTime === true && this.state.methodOfTrans) {
            nextButton = <Link to={{pathname:"/order-summary", state: { items: this.props.location.state.items }}}>
                            <button className="next-button">
                                Next
                                <i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i>
                            </button>
                        </Link>
        } else if (this.state.pickupTime !== true) {
            nextButton = <Link to={{pathname:"/order-summary", state: { items: this.props.location.state.items }}}>
                            <button className="next-button">
                                Next
                                <i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i>
                            </button>
                        </Link>
        } else {
            nextButton = <button
                            onClick={this.toggleAdditionalInfoNotification}
                            className="next-button">
                            Next
                            <i className="fa fa-arrow-right fa-lg" aria-hidden="true"></i>
                        </button>
        }

        return (
            <div className="additional-info-container">
                <div className="title-cover">
                    <h1>Tell us a little more!</h1>
                    <div className="userProgress">
                        <div id="threeOfFive">
                        </div>
                    </div>
                </div>
                <AdditionalInfoNotification
                    notification={this.state.notification} />
                <div>
                    <form>
                        <SelectPickUpTime
                            handlePickupTime={this.handlePickupTime}
                            value={this.state.pickupTime || true} />
                        <SelectMethodOfTrans
                            handleMethodOfTrans={this.handleMethodOfTrans}
                            methodOfTransShow={this.state.methodOfTransShow} />
                        <SelectIfFavorite
                            handleFavorite={this.handleFavorite}
                            value={this.state.favorite || false} />
                        <EnterPaymentInfo
                            handleCCName={this.handleCCName}
                            handleCCNumber={this.handleCCNumber}
                            handleCCExpMonth={this.handleCCExpMonth}
                            expMonthValue={this.state.expMonth || 'default'}
                            handleCCExpYear={this.handleCCExpYear}
                            expYearValue={this.state.expYear || 'default'}
                            handleCCCVV={this.handleCCCVV} />
                    </form>
                    <div className="next-button-container">
                        {nextButton}
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
});

export default AdditionalInfoView;
