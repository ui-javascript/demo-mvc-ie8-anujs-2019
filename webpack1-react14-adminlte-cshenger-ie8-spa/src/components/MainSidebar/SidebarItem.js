import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router'
import $ from 'jquery'

function Pulls (props) {
  return (
    <span className="pull-right-container">
      {
        props.pulls.map((pull, item) => {
          return <small key={item} className={"label pull-right " + pull.theme}>{pull.content}</small>
        })
      }
    </span>
  )
}

function ItemOne (props) {
  let iconClassName
  props.iconTheme ? iconClassName = ' ' + props.icon + ' ' + props.iconTheme : iconClassName = ' ' + props.icon

  return (
    <li key={props.key}>
      <Link to={props.url} data-title={props.dataTitle}>
        <i className={"fa"+iconClassName}></i> <span>{props.name}</span>
        { props.pulls ? <Pulls pulls={props.pulls} /> : '' }
      </Link>
    </li>
  )
}

function ItemHeader (props) {
  return <li key={props.key} className="header"><span>{props.title}</span></li>
}

function ItemList (props) {
  let isOpen = false
  let iconClassName
  props.iconTheme ? iconClassName = ' ' + props.icon + ' ' + props.iconTheme : iconClassName = ' ' + props.icon

  function toggleTreeMenu (event) {
    let $ele = $(event.currentTarget)
    isOpen = !isOpen
    if (isOpen) {
      // console.log(isOpen)
      $ele.parent('li').addClass('menu-open')
      $ele.next('ul').slideDown(100)
    } else {
      // console.log(isOpen)
      $ele.parent('li').removeClass('menu-open')
      $ele.next('ul').slideUp(100)
    }
  }

  return (
    <li className="treeview" key={props.key}>
      <a href={props.url} data-title={props.dataTitle} onClick={toggleTreeMenu}>
        <i className={"fa"+iconClassName}></i> <span>{props.name}</span>
        <span className="pull-right-container">
          <i className="fa fa-angle-left pull-right"></i>
        </span>
      </a>
      <ul className="treeview-menu">
        {props.children}
      </ul>
    </li>
  )
}

export { Pulls, ItemHeader, ItemOne, ItemList }
