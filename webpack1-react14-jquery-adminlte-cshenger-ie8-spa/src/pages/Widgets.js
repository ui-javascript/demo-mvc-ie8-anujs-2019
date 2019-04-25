import React, { Component, PropTypes } from 'react'

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import InfoTile from '../components/InfoTile'
import ProgressBar from '../components/InfoTile/ProgressBar'
import StatTile from '../components/StatTile'
import Box from '../components/Box'
import ChatBox from '../components/ChatBox'
import Conversations from '../components/ChatBox/Conversations'
import Contacts from '../components/ChatBox/Contacts'
import ProfileCard from '../components/ProfileCard'
import ProfileInfoBlocks from '../components/ProfileCard/ProfileInfoBlocks'
import ProfileInfoList from '../components/ProfileCard/ProfileInfoList'
import SimpliArticles from '../components/SimpliArticles'
import SocialButton from '../components/SimpliArticles/SocialButton'
import SocialInfo from '../components/SimpliArticles/SocialInfo'

// 面包屑测试数据
var breads = [
  {
    icon: "fa fa-dashboard",
    url: "#",
    name: "Home",
    active: false
  },
  {
    url: "#",
    name: "Dashboard",
    active: true
  }
]

// ChatBox测试数据
var conversationsInfo = [{
    name: 'Alexander Pierce',
    displayPicture: '../../public/dist/imgs/user1-128x128.jpg',
    date: '23 Jan 2:00 pm',
    message: "Is this template really for free? That's unbelievable!"
}, {
    align: 'right',
    name: 'Sarah Bullock',
    displayPicture: '../../public/dist/imgs/user3-128x128.jpg',
    date: '23 Jan 2:05 pm',
    message: 'You better believe it!'
}];

var contactsInfo = [{
    name: 'Count Dracula',
    displayPicture: '../../public/dist/imgs/user1-128x128.jpg',
    link: '#',
    date: '2/28/2015',
    message: 'How have you been? I was...'
}, {
    name: 'Count Dracula',
    displayPicture: '../../public/dist/imgs/user1-128x128.jpg',
    link: '#',
    date: '2/28/2016',
    message: 'How have you been? I was...'
}];

// ProfileCard 测试数据
var infoList = [{
    description: 'Projects',
    stats: 29,
    link: '#',
    badgeTheme: 'bg-blue'
}, {
    description: 'Reviews',
    stats: 10,
    link: '#',
    badgeTheme: 'bg-yellow'
}];

var infoList2 = [{
    description: 'PROJECTS',
    stats: 20
}, {
    description: 'CITIES',
    stats: 11
}, {
    description: 'COUNTRIES',
    stats: 5
}];

// SimpliArticles 测试数据
var comments = [
	{
	    displayName: 'Maria Gonzales',
	    displayPicture: '../dist/img/user3-128x128.jpg',
	    date: '8:03 PM Today',
	    content: 'Looks great!',
	}, {
	    displayName: 'Luna Stark',
	    displayPicture: '../dist/img/user4-128x128.jpg',
	    date: '8:21 PM Today',
	    content: 'Very nice ambience, would love to work in a place like this!',
	}
]

var attachments = [
    {
        title: 'My Office Lobby',
        link: 'http://www.lipsum.com/',
        picture: '../dist/img/photo2.png',
        content: 'The sun was beautiful today morning. It felt like the office needed a new decor. I began to start re-arranging... '
    }
]

class DashBoard extends Component {
  render () {
    return (
      <div>
        <ContentHeader content="Widgets" title="Preview page">
          <Breadcrumb breads={breads} />
        </ContentHeader>

        <section className="content">
          {/* InfoTile */}
          <div className="row">
            <InfoTile />

            <InfoTile
              theme="bg-green"
              stats={70}
              icon="fa-bell"
            >
              <ProgressBar
                percent={70}
                description="这个进度条是 70%"
              />
            </InfoTile>

            <InfoTile
              theme="bg-yellow"
              stats="写一点文字"
              icon="fa-area-chart"
              subject="标题" />

              <InfoTile
                theme="bg-red"
                icon="fa-legal"
              >
                <ProgressBar />
              </InfoTile>
          </div>

          {/* StatTile */}
          <div className="row">
            <StatTile />

            <StatTile
              theme="bg-yellow"
              icon="fa-hand-peace-o"
              stats="150"
              subject="New Orders" />

            <StatTile
              theme="bg-green"
              icon="fa-area-chart"
              stats="53%"
              subject="Bounce Rate" />

              <StatTile
                theme="bg-red"
                icon=" fa-pie-chart"
                stats="65"
                subject="Unique Visitors" />
          </div>

          {/* Box */}
          <div className="row">
            <Box
              width = {3}
              border = {true}
              content = 'The body of the box'
              theme = 'box-default'
              title = 'Expandable'
              collapsed = {true}
              boxTools = {['expand']}
            />

            <Box
              width = {3}
            	border = {false}
            	content = 'The body of the box'
            	theme = 'box-primary'
            	title = 'Collapsable'
              headerIcon = 'fa-clock-o'
              boxTools = {['collapse']}
            />

            <Box
              width = {3}
            	content = 'The body of the box'
            	theme = 'box-danger'
            	title = 'Removable'
              boxTools = {['remove']}
            />

            <Box
              width = {3}
            	content = 'The body of the box'
            	theme = 'box-warning'
            	loading = {true}
            	title = 'Loading state'
              boxTools = {['collapse']}
            />
          </div>

          {/*ChatBox*/}
          <div className="row">
            <ChatBox
              width = {6}
              buttonTheme = 'btn-primary'
              chatTheme = 'direct-chat-primary'
              headerTheme = 'box-primary'
              notificationTheme = 'bg-light-blue'
              title = 'Direct Chat'
              notifications = {2} >
                <Conversations conversations = {conversationsInfo} />
                <Contacts contacts = {contactsInfo} />
            </ChatBox>

            <ChatBox
              width = {6}
              buttonTheme = 'btn-success'
              chatTheme = 'direct-chat-success'
              headerTheme = 'box-success'
              notificationTheme = 'bg-green'
              title = 'Direct Chat'
              notifications = {2} >
                <Conversations conversations = {conversationsInfo} />
                <Contacts contacts = {contactsInfo} />
            </ChatBox>
          </div>

          {/*ProfileCard*/}
          <div className="row">
            <ProfileCard
              width = {4}
              theme = 'bg-red'
              displayName = 'Jane Doe'
              description = 'Lead Developer'
              displayPicture = '../../public/dist/imgs/user7-128x128.jpg'
              pictureAlignment = 'left' >
              <ProfileInfoList list={infoList} />
            </ProfileCard>

            <ProfileCard
              width = {4}
            	theme = 'bg-aqua'
            	displayName = 'John Roe'
            	description = 'Founder & CEO'
            	displayPicture = '../../public/dist/imgs/user1-128x128.jpg'>
            	<ProfileInfoBlocks list={infoList2} />
            </ProfileCard>

            <ProfileCard
              width = {4}
            	theme = 'bg-aqua'
            	displayName = 'John Roe'
            	description = 'Founder & CEO'
            	displayPicture = '../../public/dist/imgs/user3-128x128.jpg'
            	coverPicture = '../../public/dist/imgs/photo4.jpg' >
            	<ProfileInfoBlocks list={infoList2} />
            </ProfileCard>
          </div>

          {/*SimpliArticles*/}
          <div className="row">
            <SimpliArticles
              displayName = 'Jonathan Burke Jr.'
              displayPicture = '../../public/dist/imgs/user1-128x128.jpg'
              date = 'Shared publicly - 7:30 PM Today'
              content = 'My blog post on how to revamp your workspace, check it out!'
              attachments = {attachments}
              comments = {comments} >
              <SocialButton type = 'like' position = 'right' theme='btn-primary' />
              <SocialButton type = 'share' position = 'right' />
              <SocialInfo info = '45 likes - 2 comments' position ='left'/>
            </SimpliArticles>

            <SimpliArticles
              displayName = 'Jonathan Burke Jr.'
              displayPicture = '../../public/dist/imgs/user1-128x128.jpg'
              date = 'Shared publicly - 7:30 PM Today'
              postPicture = '../../public/dist/imgs/photo2.png'
              content = 'I took this photo this morning. What do you guys think?'
              comments={comments} >
              <SocialButton type = 'like' />
              <SocialButton type = 'share' />
              <SocialInfo info = '127 likes - 3 comments' />
            </SimpliArticles>
          </div>

        </section>
      </div>
    )
  }
}

DashBoard = Pages(DashBoard)

export default DashBoard
