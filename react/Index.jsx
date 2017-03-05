import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router';

import { translate, Interpolate } from 'react-i18next';
import i18n from './i18n';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import SlideToggle from './SlideToggle.jsx';

class Index extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      lang: {
        open: false,
      }
    };
  };

  handleLangTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      lang: {
        open: true,
        anchorEl: event.currentTarget,
      },
    });
  };

  handleLangRequestClose = () => {
    this.setState({
      lang: {
        open: false,
      },
    });
  };

  handleLangChange = (event, value) => {
    i18n.changeLanguage(value);
    this.setState({
      lang: {
        open: false,
      },
    });
  }

  render () {
    const { t } = this.props;

    return (
      <div>
        <table className='main'>
          <tbody>
            <tr>
              <td>
                <span className='title'>Gitadora Skill Viewer</span>
                <span className='title_version'>v1.2.1</span>
                <span className='lang'>
                  <MuiThemeProvider>
                    <div>
                      <FlatButton
                        onTouchTap={this.handleLangTouchTap}
                        label={t('lang')}
                      >
                      </FlatButton>
                      <Popover
                        open={this.state.lang.open}
                        anchorEl={this.state.lang.anchorEl}
                        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                        targetOrigin={{horizontal: 'left', vertical: 'top'}}
                        onRequestClose={this.handleLangRequestClose}
                      >
                        <Menu onChange={this.handleLangChange}>
                          <MenuItem primaryText='日本語' value='ja'/>
                          <MenuItem primaryText='简体中文' value='cn'/>
                        </Menu>
                      </Popover>
                    </div>
                  </MuiThemeProvider>
                </span>
              </td>
            </tr>
            <tr>
              <td>
                <SlideToggle defaultOpen={true} title={t('intro.title')} level={0}>
                  <p> {t('intro.desc')} </p>
                  <p>
                    <a style={{textDecoration : 'none'}} href='https://matsumatsu233.github.io/gsv/2016/12/15/development.html' target='_blank'>
                       {t('intro.update_history') + '（Latest:2017.03.06）'}
                    </a>
                  </p>
                  <p><b>Ver 1.2.1</b></p>
                  <ul>
                    <li>
                      {t('intro.ver_1_2_1')}
                    </li>
                  </ul>
                  <p><b>Ver 1.2.0</b></p>
                  <ul>
                    <li>
                      { t('intro.ver_1_2_0.mes1') }
                      <ul>
                        <li>
                          <a href='/tbre/list' target='_blank' style={{textDecoration : 'none'}}>GITADORA Tri-Boost Re:EVOLVE List</a>
                        </li>
                        <li>
                          <a href='/tb/list' target='_blank' style={{textDecoration : 'none'}}>GITADORA Tri-Boost List</a>
                        </li>
                      </ul>
                    </li>
                    <li>{t('intro.ver_1_2_0.mes2')}</li>
                  </ul>
                  <p><b>Ver 1.1.2</b></p>
                  <ul>
                    <li>
                      {t('intro.ver_1_1_2')}
                    </li>
                  </ul>
                </SlideToggle>
              </td>
            </tr>
            <tr>
              <td>
                <SlideToggle defaultStatus={false} title={t('how.title')} level={0}>
                  <SlideToggle defaultStatus={false} title={t('how.upload.title')} level={1}>
                    <p> {t('how.upload.step1.desc')}</p>
                    <p> For GITADORA Tri-Boost Re:EVOLVE </p>
                    <div className='script'> {'javascript:void(!function(d){var s=d.createElement(\'script\');s.type=\'text/javascript\';s.src=\'//gitadora-skill-viewer.herokuapp.com/js/uploaddata_tbre.js\';d.head.appendChild(s);}(document));'} </div>
                    <p> For GITADORA Tri-Boost </p>
                    <div className='script'> {'javascript:void(!function(d){var s=d.createElement(\'script\');s.type=\'text/javascript\';s.src=\'//gitadora-skill-viewer.herokuapp.com/js/uploaddata_tb.js\';d.head.appendChild(s);}(document));}'} </div>
                    <p>
                      <img src={'image/' + t('how.upload.step1.img')} />
                    </p>
                    <p><Interpolate i18nKey='how.upload.step2.desc' useDangerouslySetInnerHTML={true}/></p>
                    <img src={'image/' + t('how.upload.step2.img')} width='80%' />
                    <p><Interpolate i18nKey='how.upload.step3.desc' useDangerouslySetInnerHTML={true}/></p>
                    <img src={'image/' + t('how.upload.step3.img')} width='80%' />
                  </SlideToggle>
                  <SlideToggle defaultStatus={false} title={t('how.save.title')} level={1}>
                    <p> {t('how.save.step1.desc')} </p>
                    <p>
                      <img src={'image/' + t('how.save.step1.img1')} />
                    </p>
                    <p>
                      <img src={'image/' + t('how.save.step1.img2')} />
                    </p>
                    <p><Interpolate i18nKey='how.save.step2.desc' useDangerouslySetInnerHTML={true}/></p>
                    <p>
                      <img src={'image/' + t('how.save.step2.img')} width='80%' />
                    </p>
                  </SlideToggle>
                </SlideToggle>
              </td>
            </tr>
            <tr>
              <td>
                <SlideToggle defaultStatus={false} title={t('desc.title')} level={0}>
                  <p><Interpolate i18nKey='desc.1st' useDangerouslySetInnerHTML={true}/></p>
                  <p><Interpolate i18nKey='desc.2nd' useDangerouslySetInnerHTML={true}/></p>
                  <p><Interpolate i18nKey='desc.3rd' useDangerouslySetInnerHTML={true}/></p>
                </SlideToggle>
              </td>
            </tr>
            <tr>
              <td>
                <SlideToggle defaultStatus={false} title={t('other.title')} level={0}>
                  <p>
                    { '★' + t('other.code.title') + '：' }
                    <a href='https://github.com/matsumatsu233/gitadora-skill-viewer' target='_blank'>Github</a>
                  </p>
                  <p>
                    { '★' + t('other.voice.title') + '：' }
                    <a href='https://matsumatsu233.github.io/gsv/' target='_blank'>Blog</a>
                  </p>
                  <p> { t('other.voice.desc1') } </p>
                  <p><Interpolate i18nKey='other.voice.desc2' useDangerouslySetInnerHTML={true}/></p>
                  <p> { '★' + t('other.browser.title') } </p>
                  <p> Chrome, Safari </p>
                </SlideToggle>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default translate(['common'])(Index); 