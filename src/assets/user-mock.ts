export const UserData = {
    id: null,
    name: 'John Doe',
    profession: 'Anonymous',
    photoURL: 'https://avatarfiles.alphacoders.com/956/95609.jpg',
    data: [
        {
            groupName: 'personal',
            groupData: [
                {
                    title: 'Name',
                    description: 'John Doe'
                },
                {
                    title: 'D.O.B.',
                    description: 'dd.mm.yyyy'
                },
                {
                    title: 'Marital st.',
                    description: 'single'
                },
                {
                    title: 'Children',
                    description: 'no'
                },
                {
                    title: 'Location',
                    description: 'Darknet'
                }
            ]
        },
        {
            groupName: 'contacts',
            groupData: [
                {
                    title: 'e-mail',
                    description: 'john.doe@dark.com'
                },
                {
                    title: 'skype',
                    description: 'johnny_d'
                },
                {
                    title: 'phone',
                    description: 'XXX-XXX-XXXX'
                }
            ]
        },
        {
            groupName: 'social',
            groupData: [
                {
                    title: 'DJohn',
                    link: 'https://www.facebook.com/profile.php?id=100032630841678'
                },
                {
                    title: 'John Doe',
                    link: 'https://www.linkedin.com/company/john-doe'
                }
            ]
        },
        {
            groupName: 'welcome',
            groupData: `Hello!<br/><br/>
Right part of your CV can be edited both as regular text and HTML script.
 You are able to include css styles to make your copy attractive.
 Any included script is being automatically removed.
 <br/><br/>Here goes link that leads to your characteristics. <i><br/>It should contain id="link" attribute to work correctly</i>
 <a id="link" style="font-weight: bold; cursor: pointer; width: 90%; text-align: center; display: inline-block; margin: 10px">>>LINK TO SKILLS<<</a>
<br/>Navigation to your skills also can be done via leftside navigation menu<br/><br/>
Best regards,<br/>
John`
        },
        {
            groupName: 'about me',
            groupData: `Success and results-driven, and bla bla bla...
<br/>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 Aliquam commodi et ipsum officia officiis reprehenderit sequi, voluptatum. Ab autem eaque,
 enim eum iure nisi, non officia, qui rem rerum soluta!`
        },
        {
            groupName: 'skills',
            groupData: `
<div style="display: flex; ">
<div style="display: flex; flex-flow: column; width: 50%; flex-wrap: wrap">
<span style="font-weight: 500">Technologies</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
<li><span style="margin-left: -8px">Second<span></li>
<li><span style="margin-left: -8px">Tenth<span></li>
</ul>
<span style="margin-top: 10px; font-weight: 500">Etc</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
<li><span style="margin-left: -8px">Second<span></li>
</ul>
<span style="margin-top: 10px; font-weight: 500">Etc</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
<li><span style="margin-left: -8px">Second<span></li>
</ul>
</div>
<div style="display: flex; flex-flow: column; width: 50%; flex-wrap: wrap; padding-left: 20px">
<span style="font-weight: 500">Etc</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
</ul>
<span style="margin-top: 10px; font-weight: 500">Some skill</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
</ul>
<span style="margin-top: 10px; font-weight: 500">Some skill</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
<li><span style="margin-left: -8px">Second<span></li>
<li><span style="margin-left: -8px">Zwei<span></li>
<li><span style="margin-left: -8px">Drei<span></li>
</ul>
<span style="margin-top: 10px; font-weight: 500">Some skill</span>
<ul style="margin-left: 30px; margin-top: 3px">
<li><span style="margin-left: -8px">First<span></li>
</ul>
</div>
</div>
                    `
        },
        {
            groupName: 'experience',
            groupData: `<style>
@media (max-width: 800px) {
main * {
font-size: unset !important;
} 
.divider {
display: none
}
} 
</style>
<div style="position: relative">
<div style="display: flex;">
<div style="width: 34%; margin-right:1%">
<span style="text-transform: uppercase; font-weight: 500">WiBox</span><br/>
<i style="font-size: 0.9rem">03.2018 - 06.2018</i>
</div>
<div style="width: 65%;">
<span style="font-weight: 500;">Frontend Developer</span><br/>
<i>Web application for testing students.</i><br/>
<span><i>Technologies: </i>Angular, Angular Material, Bootstrap, Git, WebStorm, HTML, SCSS, Scrum</span>
</div>
</div>
<div style="display: flex; margin-top: 15px">
<div style="width: 34%; margin-right:1%">
<span style="text-transform: uppercase; font-weight: 500">Dreamware</span><br/>
<i style="font-size: 0.9rem">06.2018 - present</i>
</div>
<div style="width: 65%;">
<span style="font-weight: 500;">Web Producer</span><br/>
Supporting and updating existing product web sites, creating web sites for new products, creating email newsletters, creating designs for websites and email newsletters.<br/>
<span><i>Technologies: </i>HTML, CSS, JS, Jenkins, Basecamp, WebStorm, Photoshop, Illustrator, SVN, MJML Framework</span>
</div>
</div>
<!-- class divider allows this ul to display none on mobile width -->
<ul class="divider" style="position: absolute; left: 31%; top: 9px; border-left: 2px solid #b0b0b0; padding-left: 13px; font-size: 13px; list-style-type: none">
<li style="margin: -16px 0 0 -28px; font-size: 24px; text-align: center">•</li>
<li style="margin: 82px 0 -12px -28px; font-size: 24px; text-align: center">•</li>
</ul> 
</div>                 
                    
                    
`
        },
        {
            groupName: 'education',
            groupData: `<div style="position: relative">
<div style="display: flex;">
<div style="width: 34%; margin-right:1%">
<i style="font-size: 0.9rem">09.2007 - 07.2013</i>
</div>
<div style="width: 65%;">
<span style="font-weight: 500;">Specialist of Cyber Technologies</span><br/>
<span>CyberTech University</span>
</div>
</div>
<div style="display: flex; margin-top: 15px">
<div style="width: 34%; margin-right:1%">
<i style="font-size: 0.9rem">03.2018 - 06.2018</i>
</div>
<div style="width: 65%;">
<span style="font-weight: 500;">CruelSoft IT Academy</span><br/>
<span>Web UI Development</span>
</div>
</div>
<ul class="divider" style="position: absolute; left: 31%; top: 9px; border-left: 2px solid #b0b0b0; padding-left: 13px; font-size: 13px; list-style-type: none">
<li style="margin: -16px 0 0 -28px; font-size: 24px; text-align: center">•</li>
<li style="margin: 42px 0 -12px -28px; font-size: 24px; text-align: center">•</li>
</ul> 
</div>
                    
                    
`
        },
        {
            groupName: 'interests',
            groupData: `
Lorem ipsum dolor sit amet, consectetur adipisicing elit.
 Adipisci cumque eaque maxime, minima molestias nemo quia recusandae ut velit veritatis!<br/><br/>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eligendi hic molestias repellat.
 Beatae cupiditate ducimus illo iure temporibus voluptates?
<br/><br/>
 `
        },
    ]
};

