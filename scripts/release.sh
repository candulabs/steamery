if [[ -z "$CI" ]]; then
    echo "This script only runs from a CI environment" 1>&2
    exit 1
fi


echo "Publishing Steamery to CDN"


echo "Uploading bundle to aws"
aws s3 cp build s3://steamery.candu.ai --recursive

wait

echo "Published Steamery to http://steamery.candu.ai"
