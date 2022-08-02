/*
 * Copyright (C) 2005 - 2019 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased a commercial license agreement from Jaspersoft,
 * the following license terms apply:
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import './login.form';
import jQuery from 'jquery';

import loginBox from '../components/components.loginBox';

import jrsConfigs from 'js-sdk/src/jrs.configs';
import {isIPad} from "../util/utils.common";
import aboutDialog from '../components/components.about'

window.location.hash && (window.localStorage.previousPageHash = window.location.hash);
aboutDialog.initialize();

isIPad() && jQuery('#frame').hide();
if (jrsConfigs.isProVersion) {
    loginBox._initVars = function (options) {
        this._baseInitVars(options);
        this._organizationId = options.organizationId;
        this._singleOrganization = options.singleOrganization;
    };
    loginBox._processTemplate = function () {
        this._baseProcessTemplate();
        this._organizationIdLabel = jQuery(this._dom).find('label[for="orgId"]')[0];
        this._organizationIdInput = jQuery('#orgId');
    };
    loginBox.initialize = function (options) {
        var usernameInput = jQuery('#j_username');
        this._baseInitialize(options);
        if (!this._singleOrganization && !this._organizationId) {
            jQuery(this._organizationIdLabel).removeClass('hidden');
        } else {
            this._organizationIdInput.val(this._organizationId);
        }
        if (usernameInput.val() === '' && jQuery('#j_password_pseudo').val() === '') {
            if (this._singleOrganization) {
                usernameInput.focus();
            } else if (this._organizationIdInput.val() === '') {
                this._organizationIdInput.focus();
            }
        }
    };
}
loginBox.initialize(jrsConfigs.loginState);
if (isIPad()) {
    var orientation = window.orientation;
    if ( orientation === 0 ) {
        jQuery('h2.textAccent').css('font-size', '14px').parent().css('width', '39%');
        jQuery('#copy').css('width', '600px');
        jQuery('#loginForm').css({
            left: '524px',
            right: ''
        });
    } else if ( orientation === 90 || orientation === -90 ) {
        jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
        jQuery('#copy').css('width', '766px');
    }
    jQuery('#frame').show();
    window.addEventListener('orientationchange', function (e) {
        var newOrientation = window.orientation;
        if ( newOrientation === 0 ) {
            jQuery('h2.textAccent').css('font-size', '14px').parent().css('width', '39%');
            jQuery('#copy').css('width', '600px');
            jQuery('#loginForm').css({
                left: '524px',
                right: ''
            });
        } else if ( newOrientation === 90 || newOrientation === -90 ) {
            jQuery('h2.textAccent').css('font-size', '16px').parent().css('width', '46%');
            jQuery('#copy').css('width', '766px');
            jQuery('#loginForm').css({
                left: '',
                right: '-10px'
            });
        }
    });
}
