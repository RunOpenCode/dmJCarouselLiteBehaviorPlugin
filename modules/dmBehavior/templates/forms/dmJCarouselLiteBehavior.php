<?php

echo

$form->renderGlobalErrors(),

_open('div.dm_tabbed_form'),

_tag('ul.tabs',
  _tag('li', _link('#'.$baseTabId.'_basic')->text(__('Basic'))).
  _tag('li', _link('#'.$baseTabId.'_theme')->text(__('Theme'))).
  _tag('li', _link('#'.$baseTabId.'_advance')->text(__('Advance')))
),

_tag('div#'.$baseTabId.'_basic',
  _tag('ul.dm_form_elements',
    $form['inner_target']->renderRow().
    $form['item_width']->renderRow().
    $form['item_height']->renderRow().
    $form['start']->renderRow().
    $form['visible']->renderRow().
    $form['scroll']->renderRow().
    $form['dm_behavior_enabled']->renderRow() 
  )
),

_tag('div#'.$baseTabId.'_theme',
  _tag('ul.dm_form_elements',
    $form['theme']->renderRow().
    $form['is_vertical']->renderRow().
    $form['pager']->renderRow().
    $form['navigation']->renderRow()
  )
),

_tag('div#'.$baseTabId.'_advance',
  _tag('ul.dm_form_elements',
    $form['auto_scroll']->renderRow().
    $form['auto_scroll_period']->renderRow().
    $form['hover_pause']->renderRow().
    $form['speed']->renderRow().
    $form['easing']->renderRow().
    $form['is_circular']->renderRow().
    $form['mouse_wheel']->renderRow()
  )
),

_close('div'); 