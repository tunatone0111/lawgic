#!/bin/bash
python3 bert-server/manage.py run &
cd server && npm run start:dev &
cd ../lawgicWeb && npm run &
echo Server Started...
