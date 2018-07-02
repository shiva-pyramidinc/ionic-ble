import { Component, ViewChild, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import Chart from 'chart.js';
import moment from 'moment';
import plugin from 'chartjs-plugin-streaming';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild('lineChart') lineChart;
  public lineChartEl: any;
  public chartLabels: any = [];
  public chartValues: any = [];
  public chartColours: any = [];
  public chartHoverColours: any = [];
  public chartLoadingEl: any;
  avgBpm: number = 78;
  public technologies: any = {
    "technologies": [
      {
        'technology': 'Mobile: Ionic/Angular',
        'time': 50,
        'color': 'rgba(206, 61, 95, 0.5)',
        'hover': 'rgba(199, 108, 129, 0.5)'
      },
      {
        'technology': 'Front-end: Sass/CSS',
        'time': 15,
        'color': 'rgba(83, 131, 185, 0.5)',
        'hover': 'rgba(122, 160, 202, 0.5)'
      },
      {
        'technology': 'Server: PHP/MySQL',
        'time': 10,
        'color': 'rgba(198, 147, 194, 0.5)',
        'hover': 'rgba(200, 166, 197, 0.5)'
      },
      {
        'technology': 'Code Documentation',
        'time': 5,
        'color': 'rgba(54, 116, 152, 0.5)',
        'hover': 'rgba(103, 139, 160, 0.5)'
      },
      {
        'technology': 'Knowledge: Blogging',
        'time': 10,
        'color': 'rgba(152, 54, 145, 0.5)',
        'hover': 'rgba(152, 89, 149, 0.5)',
      },
      {
        'technology': 'SEO/Online Marketing',
        'time': 10,
        'color': 'rgba(192, 192, 192, 0.5)',
        'hover': 'rgba(220, 220, 220, 0.5)'
      }
    ]
  };

  heartDataO = [
    {
      "time": "07:30:01",
      "value": 118
    },
    {
      "time": "07:30:06",
      "value": 120
    },
    {
      "time": "07:30:11",
      "value": 121
    },
    {
      "time": "07:30:16",
      "value": 114
    },
    {
      "time": "07:30:21",
      "value": 113
    },
    {
      "time": "07:30:26",
      "value": 109
    },
    {
      "time": "07:30:31",
      "value": 111
    },
    {
      "time": "07:30:41",
      "value": 113
    },
    {
      "time": "07:30:46",
      "value": 111
    },
    {
      "time": "07:30:52",
      "value": 114
    },
    {
      "time": "07:30:57",
      "value": 115
    },
    {
      "time": "07:31:02",
      "value": 111
    },
    {
      "time": "07:31:07",
      "value": 112
    },
    {
      "time": "07:31:17",
      "value": 105
    },
    {
      "time": "07:31:22",
      "value": 101
    },
    {
      "time": "07:31:27",
      "value": 97
    },
    {
      "time": "07:31:32",
      "value": 101
    },
    {
      "time": "07:31:37",
      "value": 105
    },
    {
      "time": "07:31:42",
      "value": 107
    },
    {
      "time": "07:31:47",
      "value": 103
    },
    {
      "time": "07:31:52",
      "value": 98
    },
    {
      "time": "07:31:57",
      "value": 94
    },
    {
      "time": "07:32:02",
      "value": 95
    },
    {
      "time": "07:32:17",
      "value": 95
    },
    {
      "time": "07:32:27",
      "value": 101
    },
    {
      "time": "07:32:32",
      "value": 104
    },
    {
      "time": "07:32:37",
      "value": 103
    },
    {
      "time": "07:32:52",
      "value": 104
    },
    {
      "time": "07:32:57",
      "value": 107
    },
    {
      "time": "07:33:02",
      "value": 112
    },
    {
      "time": "07:33:07",
      "value": 110
    },
    {
      "time": "07:33:12",
      "value": 110
    },
    {
      "time": "07:33:27",
      "value": 108
    },
    {
      "time": "07:33:32",
      "value": 109
    },
    {
      "time": "07:33:37",
      "value": 110
    },
    {
      "time": "07:33:42",
      "value": 111
    },
    {
      "time": "07:33:49",
      "value": 112
    },
    {
      "time": "07:33:54",
      "value": 114
    },
    {
      "time": "07:34:09",
      "value": 114
    },
    {
      "time": "07:34:14",
      "value": 112
    },
    {
      "time": "07:34:29",
      "value": 110
    },
    {
      "time": "07:34:34",
      "value": 110
    },
    {
      "time": "07:34:39",
      "value": 110
    },
    {
      "time": "07:34:49",
      "value": 111
    },
    {
      "time": "07:34:54",
      "value": 106
    },
    {
      "time": "07:34:59",
      "value": 103
    },
    {
      "time": "07:35:04",
      "value": 105
    },
    {
      "time": "07:35:14",
      "value": 106
    },
    {
      "time": "07:35:24",
      "value": 105
    },
    {
      "time": "07:35:39",
      "value": 101
    },
    {
      "time": "07:35:44",
      "value": 102
    },
    {
      "time": "07:35:54",
      "value": 102
    },
    {
      "time": "07:35:59",
      "value": 103
    },
    {
      "time": "07:36:09",
      "value": 104
    },
    {
      "time": "07:36:14",
      "value": 105
    },
    {
      "time": "07:36:24",
      "value": 105
    },
    {
      "time": "07:36:29",
      "value": 106
    },
    {
      "time": "07:36:34",
      "value": 103
    },
    {
      "time": "07:36:39",
      "value": 90
    },
    {
      "time": "07:36:44",
      "value": 89
    },
    {
      "time": "07:36:49",
      "value": 90
    },
    {
      "time": "07:36:59",
      "value": 91
    },
    {
      "time": "07:37:06",
      "value": 92
    },
    {
      "time": "07:37:21",
      "value": 92
    },
    {
      "time": "07:37:26",
      "value": 92
    },
    {
      "time": "07:37:41",
      "value": 92
    },
    {
      "time": "07:37:56",
      "value": 92
    },
    {
      "time": "07:38:01",
      "value": 92
    },
    {
      "time": "07:38:06",
      "value": 95
    },
    {
      "time": "07:38:11",
      "value": 96
    },
    {
      "time": "07:38:16",
      "value": 97
    },
    {
      "time": "07:38:21",
      "value": 95
    },
    {
      "time": "07:38:36",
      "value": 95
    },
    {
      "time": "07:38:41",
      "value": 94
    },
    {
      "time": "07:38:46",
      "value": 95
    },
    {
      "time": "07:38:51",
      "value": 96
    },
    {
      "time": "07:39:06",
      "value": 100
    },
    {
      "time": "07:39:11",
      "value": 102
    },
    {
      "time": "07:39:16",
      "value": 104
    },
    {
      "time": "07:39:31",
      "value": 105
    },
    {
      "time": "07:39:36",
      "value": 106
    },
    {
      "time": "07:39:41",
      "value": 107
    },
    {
      "time": "07:39:56",
      "value": 107
    },
    {
      "time": "07:40:06",
      "value": 108
    },
    {
      "time": "07:40:11",
      "value": 106
    },
    {
      "time": "07:40:16",
      "value": 103
    },
    {
      "time": "07:40:21",
      "value": 104
    },
    {
      "time": "07:40:36",
      "value": 104
    },
    {
      "time": "07:40:51",
      "value": 104
    },
    {
      "time": "07:40:53",
      "value": 104
    },
    {
      "time": "07:40:58",
      "value": 105
    },
    {
      "time": "07:41:03",
      "value": 106
    },
    {
      "time": "07:41:08",
      "value": 106
    },
    {
      "time": "07:41:13",
      "value": 108
    },
    {
      "time": "07:41:23",
      "value": 108
    },
    {
      "time": "07:41:38",
      "value": 108
    },
    {
      "time": "07:41:43",
      "value": 109
    },
    {
      "time": "07:41:53",
      "value": 109
    },
    {
      "time": "07:42:03",
      "value": 109
    },
    {
      "time": "07:42:08",
      "value": 104
    },
    {
      "time": "07:42:13",
      "value": 105
    },
    {
      "time": "07:42:28",
      "value": 107
    },
    {
      "time": "07:42:43",
      "value": 107
    },
    {
      "time": "07:42:58",
      "value": 107
    },
    {
      "time": "07:43:08",
      "value": 107
    },
    {
      "time": "07:43:23",
      "value": 108
    },
    {
      "time": "07:43:38",
      "value": 108
    },
    {
      "time": "07:43:53",
      "value": 109
    },
    {
      "time": "07:43:58",
      "value": 110
    },
    {
      "time": "07:44:13",
      "value": 110
    },
    {
      "time": "07:44:18",
      "value": 109
    },
    {
      "time": "07:44:23",
      "value": 108
    },
    {
      "time": "07:44:38",
      "value": 110
    },
    {
      "time": "07:44:43",
      "value": 111
    },
    {
      "time": "07:44:53",
      "value": 112
    },
    {
      "time": "07:44:58",
      "value": 114
    },
    {
      "time": "07:45:05",
      "value": 116
    },
    {
      "time": "07:45:20",
      "value": 116
    },
    {
      "time": "07:45:25",
      "value": 115
    },
    {
      "time": "07:45:40",
      "value": 115
    },
    {
      "time": "07:45:45",
      "value": 141
    },
    {
      "time": "07:45:50",
      "value": 157
    },
    {
      "time": "07:46:05",
      "value": 157
    },
    {
      "time": "07:46:10",
      "value": 156
    },
    {
      "time": "07:46:15",
      "value": 155
    },
    {
      "time": "07:46:20",
      "value": 153
    },
    {
      "time": "07:46:25",
      "value": 150
    },
    {
      "time": "07:46:30",
      "value": 149
    },
    {
      "time": "07:46:45",
      "value": 149
    },
    {
      "time": "07:46:50",
      "value": 127
    },
    {
      "time": "07:46:55",
      "value": 124
    },
    {
      "time": "07:47:05",
      "value": 123
    },
    {
      "time": "07:47:10",
      "value": 121
    },
    {
      "time": "07:47:25",
      "value": 121
    },
    {
      "time": "07:47:30",
      "value": 112
    },
    {
      "time": "07:47:36",
      "value": 112
    },
    {
      "time": "07:47:41",
      "value": 110
    },
    {
      "time": "07:47:46",
      "value": 109
    },
    {
      "time": "07:48:01",
      "value": 109
    },
    {
      "time": "07:48:06",
      "value": 108
    },
    {
      "time": "07:48:11",
      "value": 107
    },
    {
      "time": "07:48:26",
      "value": 107
    },
    {
      "time": "07:48:41",
      "value": 106
    },
    {
      "time": "07:48:46",
      "value": 104
    },
    {
      "time": "07:48:56",
      "value": 104
    },
    {
      "time": "07:49:01",
      "value": 101
    },
    {
      "time": "07:49:06",
      "value": 99
    },
    {
      "time": "07:49:21",
      "value": 99
    },
    {
      "time": "07:49:36",
      "value": 99
    },
    {
      "time": "07:49:41",
      "value": 100
    },
    {
      "time": "07:49:51",
      "value": 101
    },
    {
      "time": "07:49:56",
      "value": 102
    },
    {
      "time": "07:50:01",
      "value": 102
    },
    {
      "time": "07:50:06",
      "value": 103
    },
    {
      "time": "07:50:11",
      "value": 105
    },
    {
      "time": "07:50:16",
      "value": 109
    },
    {
      "time": "07:50:21",
      "value": 111
    },
    {
      "time": "07:50:36",
      "value": 111
    },
    {
      "time": "07:50:41",
      "value": 113
    },
    {
      "time": "07:50:56",
      "value": 113
    },
    {
      "time": "07:51:11",
      "value": 112
    },
    {
      "time": "07:51:16",
      "value": 114
    },
    {
      "time": "07:51:23",
      "value": 114
    },
    {
      "time": "07:51:33",
      "value": 112
    },
    {
      "time": "07:51:43",
      "value": 113
    },
    {
      "time": "07:51:58",
      "value": 113
    },
    {
      "time": "07:52:13",
      "value": 113
    },
    {
      "time": "07:52:28",
      "value": 113
    },
    {
      "time": "07:52:38",
      "value": 112
    },
    {
      "time": "07:52:53",
      "value": 116
    },
    {
      "time": "07:53:08",
      "value": 115
    },
    {
      "time": "07:53:23",
      "value": 114
    },
    {
      "time": "07:53:38",
      "value": 114
    },
    {
      "time": "07:53:53",
      "value": 114
    },
    {
      "time": "07:54:08",
      "value": 114
    },
    {
      "time": "07:54:13",
      "value": 114
    },
    {
      "time": "07:54:23",
      "value": 116
    },
    {
      "time": "07:54:33",
      "value": 118
    },
    {
      "time": "07:54:38",
      "value": 120
    },
    {
      "time": "07:54:53",
      "value": 119
    },
    {
      "time": "07:55:03",
      "value": 118
    },
    {
      "time": "07:55:08",
      "value": 117
    },
    {
      "time": "07:55:23",
      "value": 117
    },
    {
      "time": "07:55:38",
      "value": 117
    },
    {
      "time": "07:55:53",
      "value": 117
    },
    {
      "time": "07:56:08",
      "value": 117
    },
    {
      "time": "07:56:23",
      "value": 118
    },
    {
      "time": "07:56:28",
      "value": 117
    },
    {
      "time": "07:56:33",
      "value": 116
    },
    {
      "time": "07:56:41",
      "value": 116
    },
    {
      "time": "07:56:46",
      "value": 119
    },
    {
      "time": "07:56:51",
      "value": 123
    },
    {
      "time": "07:56:56",
      "value": 124
    },
    {
      "time": "07:57:01",
      "value": 125
    },
    {
      "time": "07:57:16",
      "value": 126
    },
    {
      "time": "07:57:21",
      "value": 125
    },
    {
      "time": "07:57:26",
      "value": 124
    },
    {
      "time": "07:57:31",
      "value": 123
    },
    {
      "time": "07:57:46",
      "value": 122
    },
    {
      "time": "07:57:51",
      "value": 120
    },
    {
      "time": "07:58:06",
      "value": 135
    },
    {
      "time": "07:58:11",
      "value": 134
    },
    {
      "time": "07:58:16",
      "value": 132
    },
    {
      "time": "07:58:21",
      "value": 129
    },
    {
      "time": "07:58:26",
      "value": 128
    },
    {
      "time": "07:58:36",
      "value": 127
    },
    {
      "time": "07:58:51",
      "value": 126
    },
    {
      "time": "07:59:01",
      "value": 126
    },
    {
      "time": "07:59:11",
      "value": 124
    },
    {
      "time": "07:59:16",
      "value": 124
    },
    {
      "time": "07:59:21",
      "value": 113
    },
    {
      "time": "07:59:26",
      "value": 111
    },
    {
      "time": "07:59:31",
      "value": 110
    },
    {
      "time": "07:59:38",
      "value": 110
    },
    {
      "time": "07:59:43",
      "value": 109
    },
    {
      "time": "07:59:48",
      "value": 105
    },
    {
      "time": "07:59:53",
      "value": 104
    },
    {
      "time": "07:59:58",
      "value": 106
    },
    {
      "time": "08:00:03",
      "value": 105
    },
    {
      "time": "08:00:18",
      "value": 104
    },
    {
      "time": "08:00:23",
      "value": 105
    },
    {
      "time": "08:00:33",
      "value": 104
    },
    {
      "time": "08:00:48",
      "value": 103
    },
    {
      "time": "08:01:03",
      "value": 103
    },
    {
      "time": "08:01:18",
      "value": 103
    },
    {
      "time": "08:01:33",
      "value": 103
    },
    {
      "time": "08:01:38",
      "value": 104
    },
    {
      "time": "08:01:53",
      "value": 105
    },
    {
      "time": "08:02:03",
      "value": 106
    },
    {
      "time": "08:02:08",
      "value": 108
    },
    {
      "time": "08:02:23",
      "value": 110
    },
    {
      "time": "08:02:28",
      "value": 111
    },
    {
      "time": "08:02:38",
      "value": 110
    },
    {
      "time": "08:02:43",
      "value": 110
    },
    {
      "time": "08:02:48",
      "value": 110
    },
    {
      "time": "08:03:03",
      "value": 110
    },
    {
      "time": "08:03:18",
      "value": 110
    },
    {
      "time": "08:03:28",
      "value": 110
    },
    {
      "time": "08:03:43",
      "value": 110
    },
    {
      "time": "08:03:58",
      "value": 111
    },
    {
      "time": "08:04:00",
      "value": 111
    },
    {
      "time": "08:04:05",
      "value": 113
    },
    {
      "time": "08:04:10",
      "value": 114
    },
    {
      "time": "08:04:25",
      "value": 115
    },
    {
      "time": "08:04:35",
      "value": 114
    },
    {
      "time": "08:04:40",
      "value": 113
    },
    {
      "time": "08:04:50",
      "value": 111
    },
    {
      "time": "08:04:55",
      "value": 110
    },
    {
      "time": "08:05:00",
      "value": 110
    },
    {
      "time": "08:05:15",
      "value": 111
    },
    {
      "time": "08:05:30",
      "value": 111
    },
    {
      "time": "08:05:45",
      "value": 110
    },
    {
      "time": "08:05:50",
      "value": 110
    },
    {
      "time": "08:06:05",
      "value": 110
    },
    {
      "time": "08:06:20",
      "value": 110
    },
    {
      "time": "08:06:25",
      "value": 110
    },
    {
      "time": "08:06:30",
      "value": 110
    },
    {
      "time": "08:06:35",
      "value": 110
    },
    {
      "time": "08:06:40",
      "value": 112
    },
    {
      "time": "08:06:45",
      "value": 112
    },
    {
      "time": "08:06:50",
      "value": 111
    },
    {
      "time": "08:07:05",
      "value": 111
    },
    {
      "time": "08:07:15",
      "value": 111
    },
    {
      "time": "08:07:30",
      "value": 111
    },
    {
      "time": "08:07:40",
      "value": 111
    },
    {
      "time": "08:07:55",
      "value": 110
    },
    {
      "time": "08:08:10",
      "value": 110
    },
    {
      "time": "08:08:12",
      "value": 110
    },
    {
      "time": "08:08:17",
      "value": 113
    },
    {
      "time": "08:08:22",
      "value": 115
    },
    {
      "time": "08:08:27",
      "value": 116
    },
    {
      "time": "08:08:32",
      "value": 119
    },
    {
      "time": "08:08:37",
      "value": 118
    },
    {
      "time": "08:08:42",
      "value": 117
    },
    {
      "time": "08:08:47",
      "value": 118
    },
    {
      "time": "08:09:02",
      "value": 118
    },
    {
      "time": "08:09:17",
      "value": 118
    },
    {
      "time": "08:09:27",
      "value": 120
    },
    {
      "time": "08:09:42",
      "value": 120
    },
    {
      "time": "08:09:47",
      "value": 119
    },
    {
      "time": "08:10:02",
      "value": 119
    },
    {
      "time": "08:10:17",
      "value": 117
    },
    {
      "time": "08:10:22",
      "value": 120
    },
    {
      "time": "08:10:27",
      "value": 121
    },
    {
      "time": "08:10:32",
      "value": 119
    },
    {
      "time": "08:10:47",
      "value": 119
    },
    {
      "time": "08:10:52",
      "value": 121
    },
    {
      "time": "08:10:57",
      "value": 123
    },
    {
      "time": "08:11:12",
      "value": 123
    },
    {
      "time": "08:11:27",
      "value": 123
    },
    {
      "time": "08:11:42",
      "value": 121
    },
    {
      "time": "08:11:57",
      "value": 120
    },
    {
      "time": "08:12:12",
      "value": 115
    },
    {
      "time": "08:12:17",
      "value": 108
    },
    {
      "time": "08:12:25",
      "value": 105
    },
    {
      "time": "08:12:30",
      "value": 104
    },
    {
      "time": "08:12:40",
      "value": 103
    },
    {
      "time": "08:12:50",
      "value": 105
    },
    {
      "time": "08:12:55",
      "value": 102
    },
    {
      "time": "08:13:00",
      "value": 103
    },
    {
      "time": "08:13:05",
      "value": 102
    },
    {
      "time": "08:13:20",
      "value": 107
    },
    {
      "time": "08:13:25",
      "value": 116
    },
    {
      "time": "08:13:30",
      "value": 116
    },
    {
      "time": "08:13:40",
      "value": 117
    },
    {
      "time": "08:13:50",
      "value": 118
    },
    {
      "time": "08:13:55",
      "value": 122
    },
    {
      "time": "08:14:05",
      "value": 123
    },
    {
      "time": "08:14:20",
      "value": 123
    },
    {
      "time": "08:14:35",
      "value": 123
    },
    {
      "time": "08:14:50",
      "value": 122
    },
    {
      "time": "08:14:55",
      "value": 119
    },
    {
      "time": "08:15:10",
      "value": 119
    },
    {
      "time": "08:15:25",
      "value": 118
    },
    {
      "time": "08:15:40",
      "value": 118
    },
    {
      "time": "08:15:55",
      "value": 118
    },
    {
      "time": "08:16:10",
      "value": 114
    },
    {
      "time": "08:16:25",
      "value": 114
    },
    {
      "time": "08:16:30",
      "value": 114
    },
    {
      "time": "08:16:45",
      "value": 109
    },
    {
      "time": "08:16:47",
      "value": 109
    },
    {
      "time": "08:17:02",
      "value": 109
    },
    {
      "time": "08:17:17",
      "value": 109
    },
    {
      "time": "08:17:32",
      "value": 109
    },
    {
      "time": "08:17:42",
      "value": 105
    },
    {
      "time": "08:17:47",
      "value": 104
    },
    {
      "time": "08:17:52",
      "value": 103
    },
    {
      "time": "08:17:57",
      "value": 104
    },
    {
      "time": "08:18:12",
      "value": 104
    },
    {
      "time": "08:18:17",
      "value": 102
    },
    {
      "time": "08:18:27",
      "value": 105
    },
    {
      "time": "08:18:32",
      "value": 108
    },
    {
      "time": "08:18:37",
      "value": 110
    },
    {
      "time": "08:18:42",
      "value": 110
    },
    {
      "time": "08:18:57",
      "value": 111
    },
    {
      "time": "08:19:07",
      "value": 111
    },
    {
      "time": "08:19:12",
      "value": 110
    },
    {
      "time": "08:19:17",
      "value": 112
    },
    {
      "time": "08:19:22",
      "value": 113
    },
    {
      "time": "08:19:27",
      "value": 114
    },
    {
      "time": "08:19:32",
      "value": 113
    },
    {
      "time": "08:19:42",
      "value": 113
    },
    {
      "time": "08:19:52",
      "value": 112
    },
    {
      "time": "08:20:07",
      "value": 110
    },
    {
      "time": "08:20:12",
      "value": 109
    },
    {
      "time": "08:20:27",
      "value": 110
    },
    {
      "time": "08:20:32",
      "value": 110
    },
    {
      "time": "08:20:39",
      "value": 111
    },
    {
      "time": "08:20:54",
      "value": 111
    },
    {
      "time": "08:20:59",
      "value": 109
    },
    {
      "time": "08:21:14",
      "value": 109
    },
    {
      "time": "08:21:24",
      "value": 109
    },
    {
      "time": "08:21:39",
      "value": 109
    },
    {
      "time": "08:21:54",
      "value": 109
    },
    {
      "time": "08:22:04",
      "value": 107
    },
    {
      "time": "08:22:14",
      "value": 108
    },
    {
      "time": "08:22:29",
      "value": 108
    },
    {
      "time": "08:22:44",
      "value": 108
    },
    {
      "time": "08:22:59",
      "value": 108
    },
    {
      "time": "08:23:04",
      "value": 109
    },
    {
      "time": "08:23:09",
      "value": 111
    },
    {
      "time": "08:23:14",
      "value": 109
    },
    {
      "time": "08:23:24",
      "value": 109
    },
    {
      "time": "08:23:29",
      "value": 110
    },
    {
      "time": "08:23:34",
      "value": 115
    },
    {
      "time": "08:23:44",
      "value": 118
    },
    {
      "time": "08:23:49",
      "value": 118
    },
    {
      "time": "08:23:54",
      "value": 119
    },
    {
      "time": "08:23:59",
      "value": 118
    },
    {
      "time": "08:24:09",
      "value": 120
    },
    {
      "time": "08:24:14",
      "value": 123
    },
    {
      "time": "08:24:19",
      "value": 126
    },
    {
      "time": "08:24:24",
      "value": 127
    },
    {
      "time": "08:24:34",
      "value": 128
    },
    {
      "time": "08:24:41",
      "value": 128
    },
    {
      "time": "08:24:46",
      "value": 128
    },
    {
      "time": "08:24:56",
      "value": 125
    },
    {
      "time": "08:25:01",
      "value": 81
    },
    {
      "time": "08:25:06",
      "value": 102
    },
    {
      "time": "08:25:11",
      "value": 103
    },
    {
      "time": "08:25:21",
      "value": 104
    },
    {
      "time": "08:25:36",
      "value": 104
    },
    {
      "time": "08:25:41",
      "value": 105
    },
    {
      "time": "08:25:46",
      "value": 107
    },
    {
      "time": "08:26:01",
      "value": 107
    },
    {
      "time": "08:26:16",
      "value": 107
    },
    {
      "time": "08:26:31",
      "value": 107
    },
    {
      "time": "08:26:41",
      "value": 107
    },
    {
      "time": "08:26:46",
      "value": 107
    },
    {
      "time": "08:26:51",
      "value": 108
    },
    {
      "time": "08:26:56",
      "value": 110
    },
    {
      "time": "08:27:06",
      "value": 110
    },
    {
      "time": "08:27:11",
      "value": 112
    },
    {
      "time": "08:27:16",
      "value": 110
    },
    {
      "time": "08:27:23",
      "value": 110
    },
    {
      "time": "08:27:28",
      "value": 105
    },
    {
      "time": "08:27:43",
      "value": 105
    },
    {
      "time": "08:27:48",
      "value": 106
    },
    {
      "time": "08:28:03",
      "value": 106
    },
    {
      "time": "08:28:08",
      "value": 107
    },
    {
      "time": "08:28:23",
      "value": 107
    },
    {
      "time": "08:28:33",
      "value": 107
    },
    {
      "time": "08:28:43",
      "value": 107
    },
    {
      "time": "08:28:58",
      "value": 107
    },
    {
      "time": "08:29:03",
      "value": 108
    },
    {
      "time": "08:29:13",
      "value": 108
    },
    {
      "time": "08:29:18",
      "value": 107
    },
    {
      "time": "08:29:28",
      "value": 108
    },
    {
      "time": "08:29:33",
      "value": 109
    },
    {
      "time": "08:29:38",
      "value": 110
    },
    {
      "time": "08:29:53",
      "value": 109
    },
    {
      "time": "08:29:58",
      "value": 110
    }
  ];

  heartData = [
    {
      "time": "14:46:45",
      "value": 70
    },
    {
      "time": "14:46:55",
      "value": 70
    },
    {
      "time": "14:47:00",
      "value": 63
    },
    {
      "time": "14:47:15",
      "value": 63
    },
    {
      "time": "14:47:30",
      "value": 69
    },
    {
      "time": "14:47:35",
      "value": 70
    },
    {
      "time": "14:47:50",
      "value": 70
    },
    {
      "time": "14:48:05",
      "value": 70
    },
    {
      "time": "14:48:20",
      "value": 70
    },
    {
      "time": "14:48:30",
      "value": 75
    },
    {
      "time": "14:48:35",
      "value": 74
    },
    {
      "time": "14:48:50",
      "value": 74
    },
    {
      "time": "14:48:55",
      "value": 73
    },
    {
      "time": "14:49:00",
      "value": 73
    },
    {
      "time": "14:49:05",
      "value": 71
    },
    {
      "time": "14:49:10",
      "value": 70
    },
    {
      "time": "14:49:20",
      "value": 70
    },
    {
      "time": "14:49:25",
      "value": 70
    },
    {
      "time": "14:49:35",
      "value": 71
    },
    {
      "time": "14:49:45",
      "value": 72
    },
    {
      "time": "14:49:50",
      "value": 74
    },
    {
      "time": "14:49:55",
      "value": 76
    },
    {
      "time": "14:50:00",
      "value": 76
    },
    {
      "time": "14:50:05",
      "value": 77
    },
    {
      "time": "14:50:10",
      "value": 78
    },
    {
      "time": "14:50:15",
      "value": 77
    },
    {
      "time": "14:50:20",
      "value": 75
    },
    {
      "time": "14:50:26",
      "value": 75
    },
    {
      "time": "14:50:36",
      "value": 75
    },
    {
      "time": "14:50:46",
      "value": 74
    },
    {
      "time": "14:51:01",
      "value": 74
    },
    {
      "time": "14:51:11",
      "value": 75
    },
    {
      "time": "14:51:26",
      "value": 75
    },
    {
      "time": "14:51:36",
      "value": 61
    },
    {
      "time": "14:51:41",
      "value": 62
    },
    {
      "time": "14:51:46",
      "value": 63
    },
    {
      "time": "14:51:51",
      "value": 61
    },
    {
      "time": "14:51:56",
      "value": 67
    },
    {
      "time": "14:52:01",
      "value": 68
    },
    {
      "time": "14:52:11",
      "value": 69
    },
    {
      "time": "14:52:26",
      "value": 73
    },
    {
      "time": "14:52:31",
      "value": 74
    },
    {
      "time": "14:52:41",
      "value": 75
    },
    {
      "time": "14:52:46",
      "value": 74
    },
    {
      "time": "14:52:51",
      "value": 71
    },
    {
      "time": "14:52:56",
      "value": 78
    },
    {
      "time": "14:53:01",
      "value": 73
    },
    {
      "time": "14:53:11",
      "value": 73
    },
    {
      "time": "14:53:16",
      "value": 73
    },
    {
      "time": "14:53:21",
      "value": 73
    },
    {
      "time": "14:53:31",
      "value": 74
    },
    {
      "time": "14:53:36",
      "value": 74
    },
    {
      "time": "14:53:41",
      "value": 73
    },
    {
      "time": "14:53:48",
      "value": 73
    },
    {
      "time": "14:53:58",
      "value": 75
    },
    {
      "time": "14:54:03",
      "value": 74
    },
    {
      "time": "14:54:13",
      "value": 73
    },
    {
      "time": "14:54:28",
      "value": 75
    },
    {
      "time": "14:54:33",
      "value": 76
    },
    {
      "time": "14:54:38",
      "value": 74
    },
    {
      "time": "14:54:43",
      "value": 73
    },
    {
      "time": "14:54:48",
      "value": 73
    },
    {
      "time": "14:54:53",
      "value": 74
    },
    {
      "time": "14:55:03",
      "value": 73
    },
    {
      "time": "14:55:08",
      "value": 74
    },
    {
      "time": "14:55:18",
      "value": 73
    },
    {
      "time": "14:55:23",
      "value": 71
    },
    {
      "time": "14:55:28",
      "value": 71
    },
    {
      "time": "14:55:43",
      "value": 72
    },
    {
      "time": "14:55:53",
      "value": 78
    },
    {
      "time": "14:55:58",
      "value": 79
    },
    {
      "time": "14:56:03",
      "value": 77
    },
    {
      "time": "14:56:08",
      "value": 76
    },
    {
      "time": "14:56:23",
      "value": 76
    },
    {
      "time": "14:56:28",
      "value": 75
    },
    {
      "time": "14:56:33",
      "value": 74
    },
    {
      "time": "14:56:48",
      "value": 74
    },
    {
      "time": "14:56:53",
      "value": 74
    },
    {
      "time": "14:56:58",
      "value": 75
    },
    {
      "time": "14:57:03",
      "value": 73
    },
    {
      "time": "14:57:10",
      "value": 73
    },
    {
      "time": "14:57:25",
      "value": 73
    },
    {
      "time": "14:57:30",
      "value": 72
    },
    {
      "time": "14:57:35",
      "value": 71
    },
    {
      "time": "14:57:45",
      "value": 72
    },
    {
      "time": "14:58:00",
      "value": 72
    },
    {
      "time": "14:58:15",
      "value": 72
    },
    {
      "time": "14:58:30",
      "value": 72
    },
    {
      "time": "14:58:45",
      "value": 72
    },
    {
      "time": "14:58:50",
      "value": 73
    },
    {
      "time": "14:59:05",
      "value": 76
    },
    {
      "time": "14:59:15",
      "value": 75
    },
    {
      "time": "14:59:30",
      "value": 75
    },
    {
      "time": "14:59:35",
      "value": 77
    },
    {
      "time": "14:59:40",
      "value": 76
    },
    {
      "time": "14:59:55",
      "value": 76
    },
    {
      "time": "15:00:05",
      "value": 75
    },
    {
      "time": "15:00:15",
      "value": 75
    },
    {
      "time": "15:00:30",
      "value": 75
    },
    {
      "time": "15:00:45",
      "value": 75
    },
    {
      "time": "15:01:00",
      "value": 76
    },
    {
      "time": "15:01:05",
      "value": 78
    },
    {
      "time": "15:01:10",
      "value": 79
    },
    {
      "time": "15:01:15",
      "value": 81
    },
    {
      "time": "15:01:20",
      "value": 82
    },
    {
      "time": "15:01:25",
      "value": 83
    },
    {
      "time": "15:01:40",
      "value": 84
    },
    {
      "time": "15:01:43",
      "value": 84
    },
    {
      "time": "15:01:48",
      "value": 87
    },
    {
      "time": "15:01:53",
      "value": 90
    },
    {
      "time": "15:01:58",
      "value": 92
    },
    {
      "time": "15:02:03",
      "value": 93
    },
    {
      "time": "15:02:08",
      "value": 91
    },
    {
      "time": "15:02:13",
      "value": 90
    },
    {
      "time": "15:02:18",
      "value": 92
    },
    {
      "time": "15:02:23",
      "value": 93
    },
    {
      "time": "15:02:38",
      "value": 94
    },
    {
      "time": "15:02:43",
      "value": 95
    },
    {
      "time": "15:02:53",
      "value": 96
    },
    {
      "time": "15:02:58",
      "value": 93
    },
    {
      "time": "15:03:03",
      "value": 90
    },
    {
      "time": "15:03:08",
      "value": 89
    },
    {
      "time": "15:03:18",
      "value": 92
    },
    {
      "time": "15:03:23",
      "value": 96
    },
    {
      "time": "15:03:28",
      "value": 99
    },
    {
      "time": "15:03:33",
      "value": 96
    },
    {
      "time": "15:03:38",
      "value": 95
    },
    {
      "time": "15:03:53",
      "value": 95
    },
    {
      "time": "15:04:08",
      "value": 94
    },
    {
      "time": "15:04:18",
      "value": 82
    },
    {
      "time": "15:04:23",
      "value": 78
    },
    {
      "time": "15:04:28",
      "value": 77
    },
    {
      "time": "15:04:43",
      "value": 77
    },
    {
      "time": "15:04:45",
      "value": 77
    },
    {
      "time": "15:04:50",
      "value": 76
    },
    {
      "time": "15:05:00",
      "value": 74
    },
    {
      "time": "15:05:05",
      "value": 73
    },
    {
      "time": "15:05:10",
      "value": 74
    },
    {
      "time": "15:05:15",
      "value": 72
    },
    {
      "time": "15:05:30",
      "value": 72
    },
    {
      "time": "15:05:35",
      "value": 73
    },
    {
      "time": "15:05:45",
      "value": 73
    },
    {
      "time": "15:05:50",
      "value": 73
    },
    {
      "time": "15:05:55",
      "value": 73
    },
    {
      "time": "15:06:00",
      "value": 72
    },
    {
      "time": "15:06:15",
      "value": 72
    },
    {
      "time": "15:06:30",
      "value": 71
    },
    {
      "time": "15:06:40",
      "value": 71
    },
    {
      "time": "15:06:55",
      "value": 72
    },
    {
      "time": "15:07:00",
      "value": 73
    },
    {
      "time": "15:07:10",
      "value": 75
    },
    {
      "time": "15:07:15",
      "value": 74
    },
    {
      "time": "15:07:20",
      "value": 76
    },
    {
      "time": "15:07:25",
      "value": 75
    },
    {
      "time": "15:07:40",
      "value": 75
    },
    {
      "time": "15:07:45",
      "value": 74
    },
    {
      "time": "15:08:00",
      "value": 74
    },
    {
      "time": "15:08:15",
      "value": 74
    },
    {
      "time": "15:08:20",
      "value": 73
    },
    {
      "time": "15:08:25",
      "value": 71
    },
    {
      "time": "15:08:32",
      "value": 71
    },
    {
      "time": "15:08:37",
      "value": 70
    },
    {
      "time": "15:08:42",
      "value": 69
    },
    {
      "time": "15:08:52",
      "value": 68
    },
    {
      "time": "15:08:57",
      "value": 67
    },
    {
      "time": "15:09:02",
      "value": 65
    },
    {
      "time": "15:09:07",
      "value": 66
    },
    {
      "time": "15:09:12",
      "value": 67
    },
    {
      "time": "15:09:17",
      "value": 66
    },
    {
      "time": "15:09:22",
      "value": 66
    },
    {
      "time": "15:09:32",
      "value": 69
    },
    {
      "time": "15:09:37",
      "value": 69
    },
    {
      "time": "15:09:47",
      "value": 67
    },
    {
      "time": "15:10:02",
      "value": 64
    },
    {
      "time": "15:10:07",
      "value": 61
    },
    {
      "time": "15:10:12",
      "value": 62
    },
    {
      "time": "15:10:22",
      "value": 61
    },
    {
      "time": "15:10:27",
      "value": 60
    },
    {
      "time": "15:10:37",
      "value": 61
    },
    {
      "time": "15:10:42",
      "value": 61
    },
    {
      "time": "15:10:57",
      "value": 61
    },
    {
      "time": "15:11:07",
      "value": 63
    },
    {
      "time": "15:11:12",
      "value": 62
    },
    {
      "time": "15:11:17",
      "value": 61
    },
    {
      "time": "15:11:32",
      "value": 60
    },
    {
      "time": "15:11:47",
      "value": 61
    },
    {
      "time": "15:11:52",
      "value": 67
    },
    {
      "time": "15:11:58",
      "value": 66
    },
    {
      "time": "15:12:03",
      "value": 64
    },
    {
      "time": "15:12:13",
      "value": 65
    },
    {
      "time": "15:12:18",
      "value": 64
    },
    {
      "time": "15:12:23",
      "value": 63
    },
    {
      "time": "15:12:38",
      "value": 63
    },
    {
      "time": "15:12:48",
      "value": 64
    },
    {
      "time": "15:12:53",
      "value": 66
    },
    {
      "time": "15:13:03",
      "value": 65
    },
    {
      "time": "15:13:08",
      "value": 66
    },
    {
      "time": "15:13:13",
      "value": 76
    },
    {
      "time": "15:13:23",
      "value": 75
    },
    {
      "time": "15:13:28",
      "value": 73
    },
    {
      "time": "15:13:33",
      "value": 74
    },
    {
      "time": "15:13:38",
      "value": 75
    },
    {
      "time": "15:13:43",
      "value": 76
    },
    {
      "time": "15:13:48",
      "value": 77
    },
    {
      "time": "15:13:53",
      "value": 76
    },
    {
      "time": "15:13:58",
      "value": 76
    },
    {
      "time": "15:14:13",
      "value": 76
    },
    {
      "time": "15:14:28",
      "value": 76
    },
    {
      "time": "15:14:33",
      "value": 76
    },
    {
      "time": "15:14:43",
      "value": 75
    },
    {
      "time": "15:14:58",
      "value": 74
    },
    {
      "time": "15:15:03",
      "value": 74
    },
    {
      "time": "15:15:18",
      "value": 74
    },
    {
      "time": "15:15:20",
      "value": 74
    },
    {
      "time": "15:15:35",
      "value": 74
    },
    {
      "time": "15:15:40",
      "value": 75
    },
    {
      "time": "15:15:55",
      "value": 76
    },
    {
      "time": "15:16:10",
      "value": 75
    },
    {
      "time": "15:16:15",
      "value": 75
    },
    {
      "time": "15:16:20",
      "value": 75
    },
    {
      "time": "15:16:35",
      "value": 75
    },
    {
      "time": "15:16:50",
      "value": 75
    },
    {
      "time": "15:17:05",
      "value": 75
    },
    {
      "time": "15:17:10",
      "value": 76
    },
    {
      "time": "15:17:25",
      "value": 74
    },
    {
      "time": "15:17:30",
      "value": 74
    },
    {
      "time": "15:17:35",
      "value": 75
    },
    {
      "time": "15:17:40",
      "value": 74
    },
    {
      "time": "15:17:45",
      "value": 73
    },
    {
      "time": "15:17:50",
      "value": 74
    },
    {
      "time": "15:18:05",
      "value": 74
    },
    {
      "time": "15:18:10",
      "value": 73
    },
    {
      "time": "15:18:15",
      "value": 75
    },
    {
      "time": "15:18:30",
      "value": 73
    },
    {
      "time": "15:18:35",
      "value": 71
    },
    {
      "time": "15:18:40",
      "value": 69
    },
    {
      "time": "15:18:45",
      "value": 68
    },
    {
      "time": "15:18:50",
      "value": 69
    },
    {
      "time": "15:18:55",
      "value": 72
    },
    {
      "time": "15:19:00",
      "value": 75
    },
    {
      "time": "15:19:07",
      "value": 74
    },
    {
      "time": "15:19:12",
      "value": 74
    },
    {
      "time": "15:19:27",
      "value": 74
    },
    {
      "time": "15:19:37",
      "value": 73
    },
    {
      "time": "15:19:52",
      "value": 73
    },
    {
      "time": "15:19:57",
      "value": 72
    },
    {
      "time": "15:20:12",
      "value": 72
    },
    {
      "time": "15:20:17",
      "value": 71
    },
    {
      "time": "15:20:27",
      "value": 71
    },
    {
      "time": "15:20:32",
      "value": 76
    },
    {
      "time": "15:20:37",
      "value": 76
    },
    {
      "time": "15:20:47",
      "value": 75
    },
    {
      "time": "15:20:52",
      "value": 74
    },
    {
      "time": "15:21:02",
      "value": 74
    },
    {
      "time": "15:21:07",
      "value": 73
    },
    {
      "time": "15:21:17",
      "value": 72
    },
    {
      "time": "15:21:32",
      "value": 72
    },
    {
      "time": "15:21:47",
      "value": 73
    },
    {
      "time": "15:21:52",
      "value": 72
    },
    {
      "time": "15:22:02",
      "value": 72
    },
    {
      "time": "15:22:07",
      "value": 72
    },
    {
      "time": "15:22:12",
      "value": 76
    },
    {
      "time": "15:22:17",
      "value": 76
    },
    {
      "time": "15:22:22",
      "value": 75
    },
    {
      "time": "15:22:37",
      "value": 75
    },
    {
      "time": "15:22:47",
      "value": 74
    },
    {
      "time": "15:22:57",
      "value": 73
    },
    {
      "time": "15:23:05",
      "value": 73
    },
    {
      "time": "15:23:10",
      "value": 74
    },
    {
      "time": "15:23:15",
      "value": 74
    },
    {
      "time": "15:23:25",
      "value": 74
    },
    {
      "time": "15:23:40",
      "value": 78
    },
    {
      "time": "15:23:45",
      "value": 78
    },
    {
      "time": "15:23:50",
      "value": 77
    },
    {
      "time": "15:24:05",
      "value": 77
    },
    {
      "time": "15:24:15",
      "value": 74
    },
    {
      "time": "15:24:30",
      "value": 74
    },
    {
      "time": "15:24:45",
      "value": 74
    },
    {
      "time": "15:25:00",
      "value": 74
    },
    {
      "time": "15:25:15",
      "value": 74
    },
    {
      "time": "15:25:25",
      "value": 75
    },
    {
      "time": "15:25:35",
      "value": 75
    },
    {
      "time": "15:25:50",
      "value": 75
    },
    {
      "time": "15:25:55",
      "value": 73
    },
    {
      "time": "15:26:10",
      "value": 73
    },
    {
      "time": "15:26:20",
      "value": 72
    },
    {
      "time": "15:26:25",
      "value": 76
    },
    {
      "time": "15:26:30",
      "value": 75
    },
    {
      "time": "15:26:35",
      "value": 76
    },
    {
      "time": "15:26:45",
      "value": 75
    },
    {
      "time": "15:27:00",
      "value": 76
    },
    {
      "time": "15:27:10",
      "value": 78
    },
    {
      "time": "15:27:15",
      "value": 79
    },
    {
      "time": "15:27:20",
      "value": 82
    },
    {
      "time": "15:27:27",
      "value": 80
    },
    {
      "time": "15:27:32",
      "value": 78
    },
    {
      "time": "15:27:37",
      "value": 77
    },
    {
      "time": "15:27:42",
      "value": 77
    },
    {
      "time": "15:27:47",
      "value": 77
    },
    {
      "time": "15:27:52",
      "value": 78
    },
    {
      "time": "15:28:02",
      "value": 77
    },
    {
      "time": "15:28:07",
      "value": 76
    },
    {
      "time": "15:28:17",
      "value": 76
    },
    {
      "time": "15:28:32",
      "value": 76
    },
    {
      "time": "15:28:37",
      "value": 77
    },
    {
      "time": "15:28:52",
      "value": 77
    },
    {
      "time": "15:29:07",
      "value": 76
    },
    {
      "time": "15:29:17",
      "value": 77
    },
    {
      "time": "15:29:22",
      "value": 76
    },
    {
      "time": "15:29:37",
      "value": 76
    },
    {
      "time": "15:29:42",
      "value": 75
    },
    {
      "time": "15:29:47",
      "value": 74
    },
    {
      "time": "15:29:57",
      "value": 74
    }
  ];
  showResult: boolean = false;
  processing: boolean = false;

  constructor(public navCtrl: NavController, private _zone: NgZone) {
    Chart.plugins.register(plugin);
    let readings = this.heartData.map(item => item.value);
    let sum = readings.reduce((sum, x) => sum + x);
    this.avgBpm = Math.round(sum / readings.length);
  }

  ionViewDidEnter() {
    this.showResult = false;
    this.processing = false;
    this.defineChartData();
    this.createLineChart();
  }

  ionViewDidLeave() {
    console.log('ionViewWillUnload')
    this.lineChartEl.destroy();
  }

  getMinMaxReadings() {
    let readings = this.heartData.map(item => item.value);
    return [Math.floor(Math.min(...readings) / 10) * 10, Math.ceil(Math.max(...readings) / 10) * 10];
  }

  displayResponse() {
    this._zone.run(() => {
      this.processing = true;
      setTimeout(() => {
        this.showResult = true;
        this.processing = false;
      }, 2000)
    })
  }

  defineChartData(): void {
    let k: any;

    for (k in this.heartData) {
      var heart = this.heartData[k];
      this.chartLabels.push(heart.time);
      this.chartValues.push(heart.value);
      this.chartColours.push('rgba(206, 61, 95, 0.5)');
      this.chartHoverColours.push('rgba(206, 61, 95, 0.5)');
    }
    console.log(JSON.stringify(this.chartValues));
  }

  createLineChart(): void {
    var chartColors = {
      red: 'rgb(255, 99, 132)',
      orange: 'rgb(255, 159, 64)',
      yellow: 'rgb(255, 205, 86)',
      green: 'rgb(75, 192, 192)',
      blue: 'rgb(54, 162, 235)',
      purple: 'rgb(153, 102, 255)',
      grey: 'rgb(201, 203, 207)'
    };
    let i = 0;
    let pauseReading: boolean = false;
    var color = Chart.helpers.color;
    let [minValue, maxValue] = this.getMinMaxReadings();
    var config = {
      type: 'line',
      data: {
        datasets: [{
          label: 'Heart Rate',
          backgroundColor: color(chartColors.red).alpha(0.5).rgbString(),
          borderColor: chartColors.red,
          fill: false,
          lineTension: 0,
          pointRadius: 0,
          data: [],
          cubicInterpolationMode: 'default'
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            type: 'realtime',
            display: true,
            ticks: {
              display: false,
              autoSkip: true
            },
          }],
          yAxes: [{
            type: 'linear',
            display: true,
            scaleLabel: {
              display: false
            },
            ticks: {
              min: minValue,
              max: maxValue
            }
          }]
        },
        tooltips: {
          mode: 'nearest',
          intersect: false,
          callbacks: {
            title: (tooltipItem, data) => {
              let title = '';
              if (this.heartData[tooltipItem[0].index] && this.heartData[tooltipItem[0].index].time) {
                title = this.heartData[tooltipItem[0].index].time
              }
              return title;
            }
          }
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        plugins: {
          streaming: {
            // duration: 20000 * 5,
            duration: this.heartData.length * 20,
            refresh: 20,
            delay: 30,
            onRefresh: () => {
              console.log('onRefresh called')
              console.log(i + ' of ' + this.heartData.length);
              if (i == this.heartData.length) {
                console.log('heart data ended')
                i = 0;
                pauseReading = true;
                config.options.plugins.streaming.pause = true;
                // setTimeout(() => {
                //   config.options.plugins.streaming = <any>false;
                this.lineChartEl.update(0);
                // }, 0)

                this.displayResponse();
              }
              config.data.datasets.forEach((dataset) => {
                dataset.data.push({
                  x: moment(),
                  y: this.heartData[i].value
                });
              });
              i += 1;
            },
            pause: pauseReading
          }
        }
      }
    };

    this.lineChartEl = new Chart(this.lineChart.nativeElement, config);
  }

  createLineChartO(): void {
    this.lineChartEl = new Chart(this.lineChart.nativeElement,
      {
        type: 'line',
        data: {
          labels: this.chartLabels,
          datasets: [{
            data: []            // empty at the beggining
            // label: 'Heart rate',
            // data: this.chartValues,
            // duration: 3000,
            // easing: 'easeInOutBounce',
            // borderColor: '#f27173',
            // borderWidth: 1,
            // backgroundColor: this.chartColours,
            // hoverBackgroundColor: this.chartHoverColours,
            // fill: false,
            // pointStyle: 'circle',
            // pointRadius: 0
          }]
        },
        options: {
          // title: {
          //   display: false,
          //   text: '78 BPM'
          // },
          maintainAspectRatio: false,
          scaleShowLabels: false,
          legend: {
            display: false
          },
          layout: {
            padding: {
              left: 5,
              right: 5,
              top: 5,
              bottom: 5
            }
          },
          scales: {
            scaleLabel: {
              display: false
            },
            yAxes: [{

              ticks: {
                display: false,
                beginAtZero: false,
                stepSize: 5,
                max: 90
              },
              gridLines: {
                drawTicks: true,
                drawBorder: false,
                tickMarkLength: 1
              },
              scaleLabel: {
                display: false,
                labelString: ''
              }
            }],
            xAxes: [{
              type: 'realtime',    // x axis will auto-scroll from right to left
              // display: false,
              ticks: {
                display: false,
                stepSize: 20,
                autoSkip: true,
                maxTicksLimit: 22
              },
              gridLines: {
                drawTicks: false,
                drawBorder: true,
                tickMarkLength: 1
              },
              scaleLabel: {
                display: false,
                labelString: ''
              }
            }],
            plugins: {
              streaming: {            // enabled by default
                duration: 20000,    // data in the past 20000 ms will be displayed
                refresh: 1000,      // onRefresh callback will be called every 1000 ms
                delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
                frameRate: 30,      // chart is drawn 30 times every second
                pause: false,       // chart is not paused

                // a callback to update datasets
                onRefresh: function (chart) {
                  chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: Math.random() * 100
                  });
                }
              }
            }
          }
        }
      });
  }

}
