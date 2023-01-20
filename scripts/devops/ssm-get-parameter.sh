#!/usr/bin/env sh
# Retrieves the given parameter from AWS SSM and returns the decrypted value

if [ -z $1 ]; then
  echo "You need to pass a parameter name as an argument to this script";
  exit 1;
fi

aws --region=us-east-1 ssm get-parameter \
  --name $1 \
  --with-decryption \
  --query Parameter.Value \
  --output text
