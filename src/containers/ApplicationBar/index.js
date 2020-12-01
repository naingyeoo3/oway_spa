import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history';
import { Anchor, Affix } from 'antd';
import update from 'react-addons-update';
import { FormattedMessage } from 'react-intl';

import SearchComponents from '../../components/SearchComponents';
import TopHeaderMenuItem from '../../components/TopHeaderMenuItem';
import MobileNavBar from './MobileNavBar';
import AppMenuBar from './AppMenuBar';
import VisaSearchForm from '../../components/VisaSearchForm';
import CarRentalInfo from '../../components/CarRentalInfo';
import ListingSearch from '../../components/ListingSearch';
import ListingMenu from './ListingMenu';

import OwayRideInfo from '../../components/OwayRideInfo';
import NewsletterModelbox from '../../components/NewsletterModelbox';
import {
  changeCurrencyUnit,
  setOptionMenu,
  setPaymentType,
  handleLocaleChange,
  refreshPaymentState,
} from '../../actions/applicationBarActions';
import { DEV_URL } from '../../constants/credentials';
import { myanmarCities } from '../../constants/constants';

import { Mobile, Web } from '../../constants/helper';

import './application-bar.scss';

import messages_mm from '../../assests/resources/i18n/mm.json';
import messages_en from '../../assests/resources/i18n/en.json';

const android_download_link = `https://play.google.com/store/apps/details?id=com.mobile.oway.myapplication`;
const ios_download_link = `https://itunes.apple.com/us/app/oway-travel/id1314252839?ls=1&mt=8`;

class ApplicationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spacing: '16',
      value: 0,
      currentMenu:
        this.props.router.location.pathname == '/'
          ? '/flights'
          : this.props.router.location.pathname,
      isStickyShow: false,
      isOnAnotherApp: false,
    };
  }
  componentWillMount() {
    if (this.props.locales.lang == 'en') {
      this.handleLangChange('en', messages_en, 'en');
    } else {
      this.handleLangChange('my', messages_mm, 'mm');
    }
  }

  handleLangChange(keyword, name, query) {
    this.props.handleLocaleChange(keyword, name, query);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    // this.handlePassPaymentParams();
    this.handleRefreshPayment();
    this.loadPayment();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleRefreshPayment() {
    // this.props.refreshPaymentState();
    this.handlePassPaymentParams();
  }
  loadPayment() {
    const { navbarOptions } = this.props;
    var params = window.location.search;
    if (navbarOptions.hasOwnProperty('payment')) {
      if (
        !!navbarOptions.payment.wavepay_token ||
        !!navbarOptions.payment.kbzpay_token
      ) {
        this.setState({ isOnAnotherApp: true });
      } else if (params.includes('client') || params.includes('kbzpay_token')) {
        this.setState({ isOnAnotherApp: true });
      } else {
        this.setState({ isOnAnotherApp: false });
      }
    }
  }
  handlePassPaymentParams() {
    var params = window.location.search || null;
    var payment = new Array();
    if (
      !!params &&
      params.includes('client') &&
      params.includes('customerName')
    ) {
      payment = params
        .split('&')[0]
        .split('=')
        .concat(params.split('&')[1].split('='))
        .concat(params.split('&')[2].split('='));
      const loadData = {
        wavepay_token: payment[1],
        user_name: payment[3],
        phone: payment[5],
        channel: 10,
      };
      this.setState(update(this.state, { $set: { isOnAnotherApp: true } }));
      this.props.setPaymentType(loadData);
    } else if (!!params && params.includes('client')) {
      if (params.includes('wavemoney')) {
        payment = params
          .split('&')[0]
          .split('=')
          .concat(params.split('&')[1].split('='));
        const loadData = {
          wavepay_token: payment[1],
          phone: payment[3],
          channel: 10,
        };
        this.setState(update(this.state, { $set: { isOnAnotherApp: true } }));
        this.props.setPaymentType(loadData);
      } else {
        payment = params
          .split('&')[0]
          .split('=')
          .concat(params.split('&')[1].split('='));
        const loadData = {
          onepay_token: payment[1],
          phone: payment[3],
          channel: 13,
        };
        this.setState(update(this.state, { $set: { isOnAnotherApp: true } }));
        this.props.setPaymentType(loadData);
      }
    } else if (!!params && params.includes('kbzpay_token')) {
      payment = params.split('=');
      const loadData = {
        kbzpay_token: payment[1],
        channel: 9,
      };
      this.setState(update(this.state, { $set: { isOnAnotherApp: true } }));
      this.props.setPaymentType(loadData);
    }
  }
  handleScroll = () => {
    const { isStickyShow } = this.state;
    if (isStickyShow == false) {
      if (window.scrollY > 105) {
        this.setState(update(this.state, { $set: { isStickyShow: true } }));
      }
    } else {
      if (window.scrollY < 105) {
        this.setState(update(this.state, { $set: { isStickyShow: false } }));
      }
    }
  };
  checkPlatform = () => {
    const detect_str = window.navigator.userAgent;
    if (detect_str.includes('Android')) {
      return android_download_link;
    }
    if (detect_str.includes('iPhone OS')) {
      return ios_download_link;
    }
    if (window.navigator.userAgent.indexOf('Mac OS X') != -1) {
      return ios_download_link;
    }
    return android_download_link;
  };
  handleClickMenu = (e) => {
    history.push(e.key);
    this.setState(update(this.state, { $set: { currentMenu: e.key } }));
  };
  // detectMyanmarVisaRoute = (route)=> route == '/myanmar_visa'
  getSearchComponent = () => {
    const { router } = this.props;
    switch (router.location.pathname) {
      case '/':
        return <SearchComponents recommendedCities={myanmarCities} />;
        break;
      case '/flights':
        return <SearchComponents recommendedCities={myanmarCities} />;
        break;
      case '/buses':
        return <SearchComponents recommendedCities={myanmarCities} />;
        break;
      case '/hotels':
        return <SearchComponents recommendedCities={myanmarCities} />;
        break;
      case '/tours':
        return <SearchComponents recommendedCities={myanmarCities} />;
        break;
      case '/attractions':
        return <SearchComponents />;
        break;
      case '/myanmar_visa':
        return <VisaSearchForm />;
        break;
      case '/car_rental':
        return <CarRentalInfo />;
        break;
      case '/oway_ride':
        return <OwayRideInfo />;
        break;
      default:
        break;
    }
  };
  detectListing = () => this.props.router.location.pathname.includes('search');
  detectShowRoute = () => this.props.router.location.pathname.includes('sign-in') || this.props.router.location.pathname.includes('register')
  detectCheckout = () =>
    this.props.router.location.pathname.includes('checkout');
  render() {
    const { isStickyShow } = this.state;
    const { style } = this.props;

    return (
      <div className="app-bar" style={this.detectListing() ? style : {}}>
        {/* {
                    this.detectListing() ?
                    <div>                        
                        <ListingNavbar />                                                
                        <ListingSearch />
                    </div>
                    : */}
        <div>
          <Mobile>
            <MobileNavBar
              currentMenu={this.state.currentMenu}
              isOnAnotherApp={this.state.isOnAnotherApp}
            />
          </Mobile>
          {isStickyShow && !this.detectListing() ? (
            <Affix offsetTop={100}>
              <ListingMenu
                callbackParent={this.handleClickMenu}
                currentMenu={this.props.currentMenu}
              />
            </Affix>
          ) : null}
        <Web>
            <div style={this.detectListing() ? { background: '#0A56BB' } : {}}>
              <div className="app-container top-header">
                <div className="header-left">
                  <ul>
                    <li>
                      <a
                        href={`${DEV_URL}/faq`}
                        title="Frequently Asked Questions"
                      >
                        <FormattedMessage id="menu.faqs" />
                      </a>
                    </li>

                    <li>
                      <a href={`${DEV_URL}/contact-us`} title="Oway Contact">
                        <FormattedMessage id="menu.contact" />
                      </a>
                      <b>|</b>
                    </li>

                    <li>
                      <a href="tel:+9512318939" title="(+95) 1 231 8939">
                        <FormattedMessage id="menu.callus" />
                      </a>
                      <b>|</b>
                    </li>
                    <li>
                      <NewsletterModelbox />
                      <b>|</b>
                    </li>
                    <li>
                      <a
                        href={this.checkPlatform()}
                        rel="noopener"
                        target="_blank"
                        className="link-to-app"
                        title="Oway Mobile App Download"
                      >
                        <FormattedMessage id="menu.appdownload" />
                      </a>
                      <b>|</b>
                    </li>
                  </ul>
                </div>
                <div className="header-right">
                  <TopHeaderMenuItem />
                </div>
              </div>
            </div>
            {this.detectListing() || this.detectShowRoute() ? (
              <ListingMenu style={{ position: 'inherit' }} isListing={true} />
            ) : (
              <div className="app-container">
                <AppMenuBar
                  currentMenu={this.state.currentMenu}
                  menuMode="horizontal"
                />
              </div>
            )}
        </Web>

            <div className="app-container">
                <div className="mobile-hor-menu">
                <Mobile>
                    <Anchor>
                    <AppMenuBar
                        currentMenu={this.state.currentMenu}
                        menuMode="horizontal"
                        isMobileSticky={true}
                    />
                    </Anchor>
                </Mobile>
                </div>            
                <div>
                {this.props.router.location.pathname == '/' ? (
                    <div>
                    <Mobile>{null}</Mobile>
                    <Web>{this.getSearchComponent()}</Web>
                    </div>
                ) : (
                    this.getSearchComponent()
                )}
                </div>
            </div>
          {this.detectCheckout() ? null : (
            <Affix offsetTop={0}>
              {this.detectListing() && <ListingSearch />}
            </Affix>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  navbarOptions: state.navbarOptions,
  locales: state.locales,
  router: state.router,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrencyUnit: (type, name) =>
      dispatch(changeCurrencyUnit(type, name)),
    setOptionMenu: (menu) => dispatch(setOptionMenu(menu)),
    setPaymentType: (payment) => dispatch(setPaymentType(payment)),
    handleLocaleChange: (lang, messages, query) =>
      dispatch(handleLocaleChange(lang, messages, query)),
    refreshPaymentState: () => dispatch(refreshPaymentState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationBar);
