'use strict';

const menuManager = function(){
    const _e = document.getElementsTagName('body')[0];
    const _menu_section = document.createElement('section');
    const _script_section = document.createElement('section');
    const _scriptOne = function(id, title, icon){
        const line = document.createElement('div'):
        const edit = document.createElement('div');
        const swith = document.createElement('div');
        const title = document.createElement('span');
        const icon = document.createElement('span');
        const first = document.createElement('div');
        icon.className = 'script_icon';
        edit.className = 'script_edit fa-edit';
        line.className = 'script_line';
        title.className = 'script_title';
        first.className = 'script_first';
        icon.style.backgroundImage = ('url('+icon+')');

    }
    const _menuPoint = function(id, title, action, icon_class){
        if(typeof icon_class === 'undefined')
            icon_class = '';
        const menu = document.createElement('div');
        const icon = document.createElement('span');
        const title = document.createElement('span');
        icon.className = 'menuitem_icon '+icon_class;
        title.className = 'text';
        title.appendChild(
            document.createTextNode(title)
        );
        menu.appendChild(
            icon
        );
        menu.appendChild(
            title
        );
        menu.setAttribute('id', id);
        menu.addEventListener(
            'click',
            action,
            false
        );
        return menu;
    };
    const _mainActivateMenu = function(){
        _menuPoint(
            'menu_script_enable',
            '',
            function(){
                browser.runtime.sendMessage({'name': 'EnabledToggle'})
                    .then(function(enabled){gTplData.enabled = enabled;});
            },
            ''
        );
    };
    const _mainActivateMenuChange = function(){
        if(gTplData.enabled){
            _menuTextChange(
                'menu_script_enable',
                _('greasemonkey_is_active')
            );
            _menuIconChange(
                'menu_script_enable',
                'fa_check'
            );
            return true;
        }
        _menuTextChange(
            'menu_script_enable',
            _('greasemonkey_is_disabled')
        );

    };
    const _mainMenu = function(){
        _menuSection.appendChild(
            _menuPoint(
                'menu_script_enable',
                '',
                function(){
                    browser.runtime.sendMessage({'name': 'EnabledToggle'})
                        .then(function(enabled){gTplData.enabled = enabled;});
                },
                ''
            );
        );
        _mainActivateMenuChange();
    };
    const _menuTextChange = function(id, title){
        const el = (
            document.getElementById(id)
        ).getElementsByClassName('title')[0];
        el.innerHtml='';
        el.appendChild(
            document.createTextNode(title)
        );
    };
    const _menuIconChange = function(id, icon){
        const el = (
             document.getElementById(id)
        ).getElementsByClassName('icon')[0];
        el.innerHtml='';
        el.className = ('menuitem_icon '+icon)
    };
    const _sections = function(){
        _e.appendChild(
            _menu_section
        );
        _e.appendChild(
            _script_section
        );
    };
    const _render = function(){
        _e.innerHtml = '';
        _sections();
        _mainMenu();
    };
    // constructor
    _menu_section.className = 'section';
    _menu_section.setAttribute('id', 'menu_section');
    _script_section.className = 'section';
    _script_section.setAttribute('id', 'script_section');
}

