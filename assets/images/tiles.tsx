<?xml version="1.0" encoding="UTF-8"?>
<tileset name="tiles" tilewidth="64" tileheight="64" tilecount="64" columns="8">
 <image source="tilemap.png" width="512" height="512"/>
 <tile id="0">
  <properties>
   <property name="type" value="obstacle"/>
  </properties>
 </tile>
 <tile id="1">
  <properties>
   <property name="type" value="blank"/>
  </properties>
 </tile>
 <tile id="2">
  <properties>
   <property name="type" value="source"/>
  </properties>
 </tile>
 <tile id="3">
  <properties>
   <property name="type" value="destination"/>
  </properties>
 </tile>
 <tile id="4">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="all_way"/>
  </properties>
 </tile>
 <tile id="5">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="false"/>
   <property name="right" type="bool" value="false"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="vertical"/>
  </properties>
 </tile>
 <tile id="6">
  <properties>
   <property name="bottom" type="bool" value="false"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="false"/>
   <property name="type" value="horizontal"/>
  </properties>
 </tile>
 <tile id="7">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="false"/>
   <property name="type" value="t_down"/>
  </properties>
 </tile>
 <tile id="8">
  <properties>
   <property name="bottom" type="bool" value="false"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="t_up"/>
  </properties>
 </tile>
 <tile id="9">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="false"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="t_left"/>
  </properties>
 </tile>
 <tile id="10">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="false"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="t_right"/>
  </properties>
 </tile>
 <tile id="11">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="false"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="false"/>
   <property name="type" value="corner_top_left"/>
  </properties>
 </tile>
 <tile id="12">
  <properties>
   <property name="bottom" type="bool" value="true"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="false"/>
   <property name="top" type="bool" value="false"/>
   <property name="type" value="corner_top_right"/>
  </properties>
 </tile>
 <tile id="13">
  <properties>
   <property name="bottom" type="bool" value="false"/>
   <property name="left" type="bool" value="true"/>
   <property name="right" type="bool" value="false"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="corner_bottom_right"/>
  </properties>
 </tile>
 <tile id="14">
  <properties>
   <property name="bottom" type="bool" value="false"/>
   <property name="left" type="bool" value="false"/>
   <property name="right" type="bool" value="true"/>
   <property name="top" type="bool" value="true"/>
   <property name="type" value="corner_bottom_left"/>
  </properties>
 </tile>
 <tile id="15">
  <properties>
   <property name="type" value="border"/>
  </properties>
 </tile>
</tileset>
